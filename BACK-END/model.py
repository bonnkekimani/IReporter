from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship

from exts import db


# Role model class
class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)

# Association table for the many-to-many relationship between users and roles
user_roles = db.Table('user_roles',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('role_id', db.Integer, db.ForeignKey('roles.id'), primary_key=True)
)


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


class Call(db.Model):
    __tablename__ = 'calls'
    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.String(50))
    number_called = db.Column(db.String(20), nullable=False)
    user_phone_number = db.Column(db.String(20), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    # Update the user relationship with back_populates
    caller = db.relationship('User', back_populates='calls', lazy=True)

    def __repr__(self):
        return f"<Call time:{self.time}, number_called:{self.number_called}, caller:{self.caller.phoneNumber}>"

    def save(self, user_phone_number=None):
        if user_phone_number is not None:
            self.user_phone_number = user_phone_number

        db.session.add(self)
        db.session.commit()





