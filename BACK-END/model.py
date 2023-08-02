from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship

from exts import db


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(50), nullable=False)
    lastName = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    gender = db.Column(db.String(50))
    phoneNumber = db.Column(db.String(255), nullable=False)

    calls = db.relationship('Call', backref='calls')
    roles = db.relationship('Role', secondary=user_roles, backref=db.backref('users', lazy='dynamic'))

    def __repr__(self):
        return f"<User {self.firstName}>"

    def save(self):
        db.session.add(self)
        db.session.commit()