import os
from flask import Flask,request,jsonify, render_template,make_response
from flask_restx import Api, Resource,fields
from config import DevConfig
from exts import db
from flask_cors import CORS
from model import User, Role, Report, Call, user_roles
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from flask_jwt_extended import JWTManager,get_jwt_identity, create_access_token, create_refresh_token, jwt_required
from werkzeug import *
from flask_sqlalchemy import SQLAlchemy
import cloudinary
from cloudinary.uploader import upload
# from mailjet import Mailjet
from mailjet_rest import Client

from dotenv import load_dotenv

load_dotenv()


app = Flask(__name__)
CORS(app)
app.config.from_object(DevConfig)

# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
db.init_app(app)

migrate = Migrate(app, db)
JWTManager(app)

api = Api(app, doc="/docs")
# Configuring Cloudinary
cloudinary.config(
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("API_KEY"),
    api_secret=os.getenv("API_SECRET"),
)

# model serializer
report_model = api.model(
    "Report",
    {
        "id": fields.Integer(),
        "title": fields.String(),
        "description": fields.String(),
        "location": fields.String(),
        "media": fields.String(),
        "reporter_email": fields.String(),
        "category": fields.String(),
        "status": fields.String(),
    },
)

signup_model = api.model(
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

login_model = api.model(
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


# Route to get all roles by name
@app.route("/roles", methods=["GET"])
def get_roles():
    roles = Role.query.all()
    roles_list = [{"name": role.name} for role in roles]
    return jsonify({"roles": roles_list})



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
    

@api.route("/login", methods=["POST"])
class Login(Resource):
    @api.expect(login_model)
    def post(self):
        data = request.get_json()

        email = data.get("email")
        password = data.get("password")

        user = User.query.filter_by(email=email).first()

        if user and  check_password_hash(user.password, password):
           
            access_token=create_access_token(identity=user.email, fresh=True)
            refresh_token=create_refresh_token(identity=user.email)
            
            return jsonify(
                {"access_token":access_token, "refresh_token":refresh_token}
            )
            pass

        if user:
            # Query the roles associated with the user
            roles = db.session.query(Role.name).join(user_roles).filter(user_roles.c.user_id == user.id).all()
            roles = [role[0] for role in roles]
            if "Admin" in roles:
            # Redirect to the admin page
            # return redirect("/admin-page")
                return make_response(jsonify({"message": "logged in as an admin", "role": "Admin"}), 201)
            elif "Normal user" in roles:
                # Redirect to the user page
                # return redirect("/user-page")
                return make_response(jsonify({"message": "logged in as a Normal User", "role": "Normal user"}), 201)

            else:
                # If no role matches, return an error response
                return make_response(jsonify({"message": "Invalid credentials"}), 401)

        else:
            # If user is not found, return an error response
            return make_response(jsonify({"message": "Invalid credentials"}), 401)

# Route to post a new role to the database
@api.route("/add_role")
class AddRole(Resource):
    @api.expect(add_role_model)
    # @jwt_required()
    def post(self):
        data = request.get_json()
        
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




@api.route("/Report")
class HelloResource(Resource):
    def get(self):
        return {"message": "Hello World"}


# http methods on report.
@api.route("/reports", methods=['GET'])
class ReportsList(Resource):
    @api.marshal_list_with(report_model)
    def get(self):
        """Get all reports"""
        reports = Report.query.all()
        return reports

    
@api.route("/upload", methods=['POST'])
class Upload(Resource):
    @api.expect(report_model)
    def post(self):
        if request.method == "POST":
            file_to_upload = request.files["file"]
            if file_to_upload:
                upload_result = cloudinary.uploader.upload(file_to_upload)
                title = request.form.get('title')
                description = request.form.get('description')
                location = request.form.get('location')
                reporter_email = request.form.get('reporter_email')
                category = request.form.get('category')
                status = request.form.get('status')
                user = User.query.filter_by(email=reporter_email).first()
                if user:
                    report = Report(
                        title=title,
                        description=description,
                        media=upload_result["url"],
                        location=location,
                        reporter_email=reporter_email,
                        category=category,
                        status=status,
                        user_id=user.id
                    )
                    db.session.add(report)
                    db.session.commit()
                    return make_response(jsonify({"message": "Media and report uploaded successfully"}), 201)
                else:
                    return jsonify({"error": "User not found."}), 404
            else:
                return jsonify({"error": "No file provided."}), 400
        return jsonify({"error": "Method not allowed."}), 405
    

@app.route('/reports/<int:report_id>/status', methods=['PATCH'])
def update_report_status(report_id):
    new_status = request.json.get('status')

    if not new_status:
        return jsonify(message='Invalid status data'), 400

    report = Report.query.get(report_id)
    if not report:
        return jsonify(message='Report not found'), 404

    report.status = new_status
    db.session.commit()

    return jsonify(message='Report status updated successfully'), 200


@api.route('/report/<int:id>')
class ReportResource(Resource):
    @api.marshal_with(report_model)
    def get(self,id):
        """get a report by id"""
        report=Report.query.get_or_404(id)

        return report
        pass

@app.route("/reports/<int:report_id>", methods=['DELETE'])
def delete_report(report_id):
        # Get the report by ID
        report = Report.query.get(report_id)
        if not report:
            return jsonify({'error': 'Report not found.'}), 404
        # Delete the report from the database
        db.session.delete(report)
        db.session.commit()
        return jsonify({'message': 'Report deleted successfully.'})    
    # @api.marshal_with(report_model)
    # @jwt_required()
    # def delete(self, id):
    #     """delete a report by id"""
    #     report_to_delete = Report.query.get_or_404(id)

    #     report_to_delete.delete()
    #     return jsonify({'message': 'Report deleted successfully.'})
    #     return report_to_delete, 200
        

    #     pass

       
@app.route("/reports/<int:report_id>", methods=['PATCH'])
def update_report(report_id):
    # Get the report by ID
    report = Report.query.get(report_id)
    if not report:
        return jsonify({'error': 'Report not found.'}), 404
    # Get the updated data from the request
    data = request.json
    # Update the report fields with the new data
    report.title = data.get('title', report.title)
    report.description = data.get('description', report.description)
    report.location = data.get('location', report.location)
    report.reporter_email = data.get('reporter_email', report.reporter_email)
    # Commit the changes to the database
    db.session.commit()
    return jsonify({'message': 'Report updated successfully.'})
@app.route("/reports/<int:report_id>/media", methods=['PATCH'])
def update_report_media(report_id):
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
        # Update the report media URL in the database
        report.media = upload_result['url']
        db.session.commit()
        return jsonify({'message': 'Report updated successfully.'})




# Configure your Mailjet settings
MJ_API_KEY = '94fad3d0a11ace519457878ebeb74437'
MJ_API_SECRET = '32f1155cd1b82d2e9962236aec0e02b2'

def send_email(to_email, subject, html_content):
    try:
        # Configure your Mailjet settings
        MJ_API_KEY = '94fad3d0a11ace519457878ebeb74437'
        MJ_API_SECRET = '32f1155cd1b82d2e9962236aec0e02b2'

        mj = Client(auth=(MJ_API_KEY, MJ_API_SECRET), version='v3.1')
        
        data = {
            'Messages': [{
                'From': {
                    'Email': 'kelly.koome@student.moringaschool.com',
                    'Name': 'Admin'
                },
                'To': [{
                    'Email': to_email,
                    'Name': 'Recipient Name'
                }],
                'Subject': subject,
                'HTMLPart': html_content
            }]
        }

        response = mj.send.create(data=data)
        print(response.status_code)
        print(response.json())
    except Exception as e:
        print('Error sending email:', str(e))


@app.route('/send-email', methods=['POST'])
def send_email_route():
    try:
        data = request.json
        to_email = data.get('toEmail')
        subject = data.get('subject')
        html_content = data.get('htmlContent')

        send_email(to_email, subject, html_content)

        return jsonify({'message': 'Email sent successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.shell_context_processor
def make_shell_context():
    return {
        "db": db,
        "Role": Role,
        "User": User,
        "Report": Report,
        "Call": Call,
    }


if __name__ == "__main__":
    app.run()
