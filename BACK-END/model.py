
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


class Report(db.Model):
    __tablename__ = 'reports'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=False)
    media = db.Column(db.Text, nullable=False)
    location = db.Column(db.Text, nullable=False)

    reporter_email = db.Column(db.String(50), nullable=False)

    # Foreign key column to link the report to the user who reported it
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __repr__(self):
        return f"<Report {self.title}>"

    def save(self, reporter_user=None):
        if reporter_user:
            # Set the reporter attribute to the user who is reporting
            self.reporter = reporter_user
            # Set the reporter_email attribute to the email of the user who is reporting
            self.reporter_email = reporter_user.email
        else:
            # If no reporter_user is provided, set the reporter and reporter_email attributes to None
            self.reporter = None
            self.reporter_email = None

        # Save the report to the database
        db.session.add(self)
        db.session.commit()