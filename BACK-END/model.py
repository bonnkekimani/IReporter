
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
