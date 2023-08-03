import os
from flask import Flask,request,jsonify, render_template
from flask_restx import Api, Resource,fields
from config import DevConfig
from exts import db
from model import User, Role, Report, Call
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash,check_password_hash
from werkzeug.utils import secure_filename
from flask_jwt_extended import JWTManager,create_access_token,create_refresh_token,jwt_required
from werkzeug import *
from flask_sqlalchemy import SQLAlchemy
import cloudinary
from cloudinary.uploader import upload
from dotenv import load_dotenv
from config import DevConfig
load_dotenv()


app = Flask(__name__)
app.config.from_object(DevConfig)
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
db.init_app(app)

migrate=Migrate(app,db)
JWTManager(app)

api = Api(app,doc='/docs')
# Configuring Cloudinary
cloudinary.config(
    cloud_name=os.getenv('CLOUD_NAME'),
    api_key=os.getenv('API_KEY'),
    api_secret=os.getenv('API_SECRET')
)

#model serializer
report_model=api.model(
    "Report",
    {
        "id":fields.Integer(),
        "title":fields.String(),
        "description":fields.String(),
        "media":fields.String(),
        "location":fields.String(),
    }
)

signup_model=api.model(
    "SignUp",
    {
        "firstName":fields.String(),
        "lastName":fields.String(),
        "email":fields.String(),
        "gender":fields.String(),
        "password":fields.String(),

    }
)

login_model=api.model(
    "Login",
    {
        "firstName":fields.String(),
        "lastName":fields.String(),
        "password":fields.String(),

    }
)

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


# #password hashing
# db_user=User.query.filter_by(firstName=firstName, lastName=lastName).first()

# if db_user and check_password_hash(db_user.password,password):

#                 access_token=create_access_token(identity=db_user.firstName and db_user.lastName)
#                 refresh_token=create_refresh_token(identity=db_user.firstName and db_user.lastName)

#                 return jsonify(
#                     {"access_token":access_token,"refresh_token":refresh_token}
#                 )

@api.route('/Report')
class HelloResource(Resource):
    def get(self):
        return {"message":"Hello World"}

# http methods on report.
@api.route('/reports')
class ReportsResource(Resource):
    @api.marshal_list_with(report_model)
    def get(self):
        """Get all reports"""
        reports = Report.query.all()

        return reports
        pass

@api.route('/report/<int:id>')
class ReportResource(Resource):
    @api.marshal_with(report_model)
    def get(self,id):
        """get a report by id"""
        report=Report.query.get_or_404(id)

        return report
        pass
    
    @api.marshal_with(report_model)
    # @jwt_required()
    def put(self, id):
        """put/update a report by id"""
        report_to_update=Report.query.get_or_404(id)

        data=request.get_json()

        report_to_update.update(data.get('title'), data.get('description'),data.get('media'),data.get('location'))
        return report_to_update, 200
        pass


    @api.marshal_with(report_model)
    @jwt_required()
    def delete(self, id):
        """delete a report by id"""
        report_to_delete = Report.query.get_or_404(id)

        report_to_delete.delete()
        return report_to_delete, 200

        pass
      
       
@api.route("/upload",)
class Upload(Resource):
    @api.marshal_with(report_model)
    @api.expect(report_model)
    @jwt_required()
    def post(self):
        # def post(self):
        api.logger.info('in upload route')
        if request.method == 'POST':
            file_to_upload = request.files['file']
        # Updated key from 'file' to 'image'
            api.logger.info('%s image_to_upload', file_to_upload)
            if file_to_upload:
                    # Upload the image to Cloudinary
                upload_result = cloudinary.uploader.upload(file_to_upload)
                api.logger.info(upload_result)
                    # Get other form data
                title = request.form.get('title')
                description = request.form.get('description')
                location = request.form.get('location')
                reporter_email = request.form.get('reporter_email')
                    # Create a new Report object and save it to the database
                report = Report(
                    title=title,
                    description=description,
                    media=upload_result['url'],
                    location=location,
                    reporter_email=email
                    )
                db.session.add(report)
                db.session.commit()
                return jsonify(upload_result)
            return jsonify({'error': 'No file provided.'}), 400
        return jsonify({'error': 'Method not allowed.'}), 405

@app.shell_context_processor
def make_shell_context():
    return {
        "db": db,
        "Role": Role,
        "User": User,
        "Report": Report,
        "Call": Call,
    }


if __name__ == '__main__':
    app.run()
 
