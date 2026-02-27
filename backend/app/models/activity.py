from datetime import datetime

from app.extensions import db


class Activity(db.Model):
    __tablename__ = "activities"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    task_id = db.Column(db.Integer, db.ForeignKey("tasks.id"), nullable=True)
    project_id = db.Column(db.Integer, db.ForeignKey("projects.id"), nullable=True)
    type = db.Column(db.String(80), nullable=False)
    message = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    user = db.relationship("User", backref=db.backref("activities", lazy=True))
    task = db.relationship("Task", backref=db.backref("activities", lazy=True))
    project = db.relationship("Project", backref=db.backref("activities", lazy=True))

    def serialize(self):
        return {
            "id": self.id,
            "type": self.type,
            "message": self.message,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "task_id": self.task_id,
            "project_id": self.project_id,
        }
