from datetime import datetime

from app.extensions import db


class Project(db.Model):
    __tablename__ = "projects"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=True)
    color = db.Column(db.String(60), nullable=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    owner = db.relationship("User", backref=db.backref("projects", lazy=True))
    tasks = db.relationship("Task", backref="project", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "color": self.color,
            "owner_id": self.owner_id,
            "owner": {
                "id": self.owner.id,
                "name": self.owner.username,
                "email": self.owner.email,
            }
            if self.owner
            else None,
            "taskCount": len(self.tasks or []),
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
