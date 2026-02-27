from app.models.activity import Activity


def create_activity(
    session,
    *,
    user_id,
    activity_type,
    message,
    task_id=None,
    project_id=None,
    flush=False,
):
    activity = Activity(
        user_id=user_id,
        task_id=task_id,
        project_id=project_id,
        type=activity_type,
        message=message,
    )
    session.add(activity)

    if flush:
        session.flush()

    return activity
