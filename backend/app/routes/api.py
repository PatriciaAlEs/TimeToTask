from datetime import datetime
import re

from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

from app.extensions import db
from app.models.project import Project
from app.models.user import User
from app.models.task import Task
from app.models.activity import Activity
from app.services.activity_service import create_activity
from app.utils.responses import json_response
api_bp = Blueprint('api', __name__, url_prefix='/api')


def parse_datetime(value):
    if not value:
        return None
    if isinstance(value, datetime):
        return value
    try:
        return datetime.fromisoformat(str(value).replace('Z', '+00:00'))
    except (ValueError, TypeError):
        return None


def format_status_label(raw_status):
    if not raw_status:
        return "Unknown"

    with_spaces = re.sub(r'(?<!^)(?=[A-Z])', ' ', str(raw_status).replace('_', ' '))
    return with_spaces.strip().title()


def get_authenticated_user_id():
    raw_identity = get_jwt_identity()
    if raw_identity is None:
        return None
    try:
        return int(raw_identity)
    except (TypeError, ValueError):
        return None

@api_bp.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    users = User.query.all()
    return json_response("success", "Users fetched", [user.to_dict() for user in users], 200)

@api_bp.route('/users', methods=['POST'])
@jwt_required()
def create_user():
    data = request.get_json() or {}
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return json_response('error', 'Missing fields', code=400)

    if User.query.filter((User.username == username) | (User.email == email)).first():
        return json_response('error', 'User already exists', code=400)

    new_user = User(username=username, email=email)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return json_response('success', 'User created successfully', new_user.to_dict(), 201)

@api_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        token = create_access_token(identity=str(user.id))
        data = {'token': token, 'user': user.to_dict()}
        return json_response('success', 'Login successful', data, 200)

    return json_response('error', 'Invalid credentials', code=401)


@api_bp.route('/tasks', methods=['GET'])
@jwt_required()
def list_tasks():
    user_id = get_authenticated_user_id()

    query = Task.query
    project_id = request.args.get('projectId')

    if user_id:
        query = query.filter_by(user_id=user_id)

    if project_id and str(project_id).isdigit():
        query = query.filter_by(project_id=int(project_id))

    tasks = query.order_by(Task.updated_at.desc()).all()
    return jsonify([task.to_dict() for task in tasks]), 200


@api_bp.route('/tasks/all', methods=['GET'])
@jwt_required()
def list_all_tasks():
    user_id = get_authenticated_user_id()
    tasks = Task.query.filter_by(user_id=user_id).all()
    return json_response('success', 'All tasks fetched', [task.to_dict() for task in tasks], 200)


@api_bp.route('/tasks', methods=['POST'])
@jwt_required()
def create_task():
    user_id = get_authenticated_user_id()
    data = request.get_json() or {}
    title = data.get('title')
    description = data.get('description')
    task_type = data.get('type', 'feature')
    priority = data.get('priority', 'medium')
    status = data.get('status', 'backlog')
    due_date = parse_datetime(data.get('dueDate'))
    project_id = data.get('project_id') or data.get('projectId')

    if not title:
        return json_response('error', 'Title is required', code=400)

    valid_project_id = None
    if project_id and str(project_id).isdigit():
        project = Project.query.filter_by(id=int(project_id), owner_id=user_id).first()
        if not project:
            return json_response('error', 'Project not found', code=404)
        valid_project_id = project.id

    task = Task(
        user_id=user_id, 
        project_id=valid_project_id,
        title=title, 
        description=description,
        type=task_type,
        priority=priority,
        status=status,
        dueDate=due_date
    )
    db.session.add(task)
    db.session.flush()

    create_activity(
        db.session,
        user_id=user_id,
        task_id=task.id,
        project_id=task.project_id,
        activity_type='task_created',
        message=f"Task '{task.title}' created",
    )

    db.session.commit()
    return jsonify(task.to_dict()), 201


@api_bp.route('/tasks/<int:task_id>', methods=['PUT'])
@jwt_required()
def update_task(task_id):
    user_id = get_authenticated_user_id()
    task = Task.query.filter_by(id=task_id, user_id=user_id).first()

    if not task:
        return json_response('error', 'Task not found', code=404)

    data = request.get_json() or {}
    previous_status = task.status

    if 'title' in data:
        task.title = data['title']
    if 'description' in data:
        task.description = data['description']
    if 'type' in data:
        task.type = data['type']
    if 'priority' in data:
        task.priority = data['priority']
    if 'status' in data:
        task.status = data['status']
    if 'dueDate' in data:
        task.dueDate = parse_datetime(data['dueDate'])
    if 'completed' in data:
        task.completed = bool(data['completed'])
    if 'project_id' in data or 'projectId' in data:
        incoming_project_id = data.get('project_id') or data.get('projectId')
        if incoming_project_id is None:
            task.project_id = None
        elif str(incoming_project_id).isdigit():
            project = Project.query.filter_by(id=int(incoming_project_id), owner_id=user_id).first()
            if not project:
                return json_response('error', 'Project not found', code=404)
            task.project_id = project.id

    if 'status' in data and task.status != previous_status:
        create_activity(
            db.session,
            user_id=user_id,
            task_id=task.id,
            project_id=task.project_id,
            activity_type='status_changed',
            message=f"Status changed to {format_status_label(task.status)}",
        )

    db.session.commit()
    return jsonify(task.to_dict()), 200


@api_bp.route('/activities', methods=['GET'])
@jwt_required()
def list_activities():
    user_id = get_authenticated_user_id()

    page = request.args.get('page', default=1, type=int)
    limit = request.args.get('limit', default=50, type=int)

    if page < 1:
        page = 1

    if limit < 1:
        limit = 1

    limit = min(limit, 50)

    query = Activity.query.filter_by(user_id=user_id).order_by(Activity.created_at.desc())
    total = query.count()

    activities = query.offset((page - 1) * limit).limit(limit).all()

    return jsonify(
        {
            'items': [activity.serialize() for activity in activities],
            'page': page,
            'limit': limit,
            'total': total,
        }
    ), 200


@api_bp.route('/tasks/<int:task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    user_id = get_authenticated_user_id()
    task = Task.query.filter_by(id=task_id, user_id=user_id).first()

    if not task:
        return json_response('error', 'Task not found', code=404)

    db.session.delete(task)
    db.session.commit()
    return jsonify({'success': True}), 200


@api_bp.route('/projects', methods=['GET'])
@jwt_required()
def list_projects():
    user_id = get_authenticated_user_id()

    query = Project.query
    if user_id:
        query = query.filter_by(owner_id=user_id)

    projects = query.order_by(Project.updated_at.desc()).all()
    return jsonify([project.to_dict() for project in projects]), 200


@api_bp.route('/projects', methods=['POST'])
@jwt_required()
def create_project():
    data = request.get_json() or {}
    name = data.get('name')

    if not name:
        return json_response('error', 'Project name is required', code=400)

    owner_id = get_authenticated_user_id()

    project = Project(
        name=name,
        description=data.get('description'),
        color=data.get('color'),
        owner_id=owner_id,
    )

    db.session.add(project)
    db.session.commit()

    return jsonify(project.to_dict()), 201


@api_bp.route('/projects/<int:project_id>', methods=['GET'])
@jwt_required()
def get_project(project_id):
    user_id = get_authenticated_user_id()
    project = Project.query.filter_by(id=project_id, owner_id=user_id).first()
    if not project:
        return json_response('error', 'Project not found', code=404)
    return jsonify(project.to_dict()), 200


@api_bp.route('/projects/<int:project_id>', methods=['PUT'])
@jwt_required()
def update_project(project_id):
    user_id = get_authenticated_user_id()
    project = Project.query.filter_by(id=project_id, owner_id=user_id).first()
    if not project:
        return json_response('error', 'Project not found', code=404)

    data = request.get_json() or {}
    if 'name' in data and data.get('name'):
        project.name = data.get('name')
    if 'description' in data:
        project.description = data.get('description')
    if 'color' in data:
        project.color = data.get('color')

    db.session.commit()
    return jsonify(project.to_dict()), 200


@api_bp.route('/projects/<int:project_id>', methods=['DELETE'])
@jwt_required()
def delete_project(project_id):
    user_id = get_authenticated_user_id()
    project = Project.query.filter_by(id=project_id, owner_id=user_id).first()
    if not project:
        return json_response('error', 'Project not found', code=404)

    for task in project.tasks:
        task.project_id = None

    db.session.delete(project)
    db.session.commit()
    return jsonify({'success': True}), 200


@api_bp.route('/projects/<int:project_id>/tasks', methods=['GET'])
@jwt_required()
def list_project_tasks(project_id):
    user_id = get_authenticated_user_id()
    project = Project.query.filter_by(id=project_id, owner_id=user_id).first()
    if not project:
        return json_response('error', 'Project not found', code=404)

    tasks = Task.query.filter_by(project_id=project_id).order_by(Task.updated_at.desc()).all()
    return jsonify([task.to_dict() for task in tasks]), 200