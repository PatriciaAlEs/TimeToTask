from datetime import datetime

from app.extensions import db


class Task(db.Model):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey("projects.id"), nullable=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    type = db.Column(db.String(50), default='feature', nullable=False)
    priority = db.Column(db.String(20), default='medium', nullable=False)
    status = db.Column(db.String(50), default='backlog', nullable=False)
    dueDate = db.Column(db.DateTime, nullable=True)
    completed = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    user = db.relationship("User", backref=db.backref("tasks", lazy=True))

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "project_id": self.project_id,
            "projectId": self.project_id,
            "title": self.title,
            "description": self.description,
            "type": self.type,
            "priority": self.priority,
            "status": self.status,
            "dueDate": self.dueDate.isoformat() if self.dueDate else None,
            "completed": self.completed,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
