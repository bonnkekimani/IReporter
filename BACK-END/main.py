# API route for user registration
@app.route("/signup", methods=["POST"])
def signup():
    # Get the user data from the request's JSON body
    data = request.json

    # Create a new User object with the provided data
    new_user = User(
        firstName=data["firstName"],
        lastName=data["lastName"],
        email=data["email"],
        password=data["password"],
        gender=data["gender"],
        phoneNumber=data["phoneNumber"],
    )

    # Assign the default role (e.g., "user") to the new user
    user_role = Role.query.filter_by(name='Normal user').first()
    new_user.roles.append(user_role)

    try:
        # Add the new_user to the database and commit the changes
        db.session.add(new_user)
        db.session.commit()

        # Return a success response to the client
        return jsonify({"message": "User successfully registered!"}), 201
    except Exception as e:
        # Handle errors, e.g., database or validation errors
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
