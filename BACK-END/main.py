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


@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email, password=password).first()

    if user:
        # Check if the user has the 'user' role
        user_role = Role.query.filter_by(name='user').first()
        is_user = user_role in user.roles

        if is_user:
            return jsonify({"message": f"User {user.firstName} logged in successfully"}), 200
        else:
            return jsonify({"message": "Invalid credentials"}), 401
    else:
        return jsonify({"message": "Invalid credentials"}), 401



@app.route("/admin_login", methods=["POST"])
def admin_login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    admin = Admin.query.filter_by(email=email, password=password).first()

    if admin:
        # Check if the admin has the 'admin' role
        admin_role = Role.query.filter_by(name='admin').first()
        is_admin = admin_role in admin.roles

        if is_admin:
            return jsonify({"message": "Admin login successful"}), 200
        else:
            return jsonify({"message": "Invalid credentials"}), 401
    else:
        return jsonify({"message": "Invalid credentials"}), 401



# Route to post a new role to the database
@app.route("/add_role", methods=["POST"])
def add_role():
    data = request.json
    name = data.get("name")

    # Check if the role name already exists in the database
    existing_role = Role.query.filter_by(name=name).first()
    if existing_role:
        return jsonify({"message": "Role with this name already exists"}), 400

    # Create a new Role object with the provided data
    new_role = Role(name=name)

    try:
        # Add the new_role to the database and commit the changes
        db.session.add(new_role)
        db.session.commit()

        # Return a success response to the client
        return jsonify({"message": "Role added successfully"}), 201
    except Exception as e:
        # Handle errors, e.g., database or validation errors
        db.session.rollback()
        return jsonify({"error": str(e)}), 500




if __name__ == "__main__":
    app.run(debug=True)


if __name__ == '__main__':
    app.run()
