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
        "reporter_email":fields.String(),
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
        "phoneNumber":fields.String()

    }
)

login_model=api.model(
    "Login",
    {
        "email":fields.String(),
        "password":fields.String(),

    }
)
add_role_model=api.model(
    "AddRole",
    {
        "name":fields.String(),
    }
)

# API route for user registration
@api.route("/signup")
class Signup(Resource):
    # @api.marshal_with(signup_model)
    @api.expect(signup_model)
    def post(self):
        # Get the user request.form from the request's JSON body
        request.form = request.get_json()

        email=request.form.get('email')
        db_user=User.query.filter_by(email=email).first()
        
        if db_user is not None:
            return jsonify({"message":f"User with email {email} already exists"})
            
        # Create a new User object with the provided request.form
        new_user = User(
            firstName=request.form.get("firstName"),
            lastName=request.form.get("lastName"),
            email=request.form.get("email"),
            password=generate_password_hash(request.form.get('password')),
            gender=request.form.get("gender"),
            phoneNumber=request.form.get("phoneNumber")
        )

        # Assign the default role (e.g., "user") to the new user
        user_role = Role.query.filter_by(name='User').first()
        new_user.roles.append(user_role)

        try:
            # Add the new_user to the request.formbase and commit the changes
            # db.session.add(new_user)
            # db.session.commit()
            new_user.save()

                # Return a success response to the client
            return jsonify({"message": "User successfully registered!"}), 201
        except Exception as e:
            # Handle errors, e.g., request.formbase or validation errors
            db.session.rollback()
            return jsonify({"error": str(e)}), 500



@api.route("/login")
class Login(Resource):
    @api.expect(login_model)
    def post(self):
        request.form = request.get_json()

        email = request.form.get("email")
        password = request.form.get("password")

        db_user = User.query.filter_by(email=email).first()

        if db_user and check_password_hash(db_user.password,password):

            access_token=create_access_token(identity=db_user.email)
            refresh_token=create_refresh_token(identity=db_user.email)

            return jsonify(
                {"access_token":access_token,"refresh_token":refresh_token}
            )

        
        if db_user:
            # Check if the user has the 'user' role
            user_role = Role.query.filter_by(name='user').first()
            is_user = user_role in user.roles

            if is_user:
                return jsonify({"message": f"User {user.firstName} logged in successfully"}), 200
            else:
                return jsonify({"message": "Invalid credentials"}), 401
        else:
            return jsonify({"message": "Invalid credentials"}), 401



# Route to post a new role to the request.formbase
@api.route("/add_role")
class AddRole(Resource):
    @api.expect(add_role_model)
    @jwt_required()
    def post(self):
        request.form = request.get_json()
        
        name = request.form.get("name")

        # Check if the role name already exists in the request.formbase
        existing_role = Role.query.filter_by(name=name).first()
        if existing_role:
            return jsonify({"message": "Role with this name already exists"}), 400

        # Create a new Role object with the provided request.form
        new_role = Role(name=name)

        try:
            # Add the new_role to the request.formbase and commit the changes
            db.session.add(new_role)
            db.session.commit()

            # Return a success response to the client
            return jsonify({"message": "Role added successfully"}), 201
        except Exception as e:
            # Handle errors, e.g., request.formbase or validation errors
            db.session.rollback()
            return jsonify({"error": str(e)}), 500



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

@api.route("/upload", methods=['POST'])
class Upload(Resource):
    # @api.marshal_with(report_model)
    @api.expect(report_model)
    # @jwt_required()
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
                    # Get other form request.form
                title = request.form.get('title')
                description = request.form.get('description')
                location = request.form.get('location')
                # reporter_email = request.form.get('reporter_email')
                    # Create a new Report object and save it to the request.formbase
                report = Report(
                    title=title,
                    description=description,
                    media=upload_result['url'],
                    location=location,
                    # reporter_email=email
                    )
                db.session.add(report)
                db.session.commit()
                return jsonify(upload_result)
            return jsonify({'error': 'No file provided.'}), 400
        return jsonify({'error': 'Method not allowed.'}), 405


@api.route('/report/<int:id>')
class ReportResource(Resource):
    @api.marshal_with(report_model)
    def get(self,id):
        """get a report by id"""
        report=Report.query.get_or_404(id)

        return report
        pass


    # @api.marshal_with(report_model)
    @jwt_required()
    def delete(self, id):
        """delete a report by id"""
        report_to_delete = Report.query.get_or_404(id)

        report_to_delete.delete()
        return jsonify({'message': 'Report deleted successfully.'})
        return report_to_delete, 200
        

        pass

       


@api.route("/media/<int:report_id>", methods=['PATCH'])
class Media(Resource):
    def patch(self, report_id):
        # Get the report by ID
        report = Report.query.get(report_id)
        if not report:
            return jsonify({'error': 'Report not found.'}), 404
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided.'}), 400
        file_to_upload = request.files['file']
        if file_to_upload:
            # Upload the image to Cloudinary
            upload_result = cloudinary.uploader.upload(file_to_upload)
            app.logger.info(upload_result)
            # Update the report media URL in the request.formbase
            report.media = upload_result['url']
            db.session.commit()
            return jsonify({"message":"file updated successfully!"})
            return jsonify(upload_result)
        return jsonify({'error': 'No file provided.'}), 400

@api.route("/medias/<int:report_id>", methods=['PATCH'])
class MediaReport(Resource):
    def patch(self, report_id):
        # Get the report by ID
        report = Report.query.get(report_id)
        if not report:
            return jsonify({'error': 'Report not found.'}), 404
        # Get the updated request.form from the request
        # request.form = request.json
        # Update the report fields with the new request.form
        report.title = request.form.get('title', report.title)
        report.description = request.form.get('description', report.description)
        report.location = request.form.get('location', report.location)
        report.reporter_email = request.form.get('reporter_email', report.reporter_email)
        # Commit the changes to the request.formbase
        db.session.commit()
        return jsonify({'message': 'Report updated successfully.'})
        
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
 
