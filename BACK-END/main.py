import os
from flask import Flask,request,jsonify, render_template
from flask_restx import Api, Resource,fields
from config import DevConfig
from exts import db
from models import User, Admin, Report, Call
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



#password hashing
db_user=User.query.filter_by(firstName=firstName, lastName=lastName).first()

if db_user and check_password_hash(db_user.password,password):

        access_token=create_access_token(identity=db_user.firstName and db_user.lastName)
        refresh_token=create_refresh_token(identity=db_user.firstName and db_user.lastName)

        return jsonify(
            {"access_token":access_token,"refresh_token":refresh_token}
        )

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

    
@app.shell_context_processor
def make_shell_context():
    return {
        "db": db,
        "Admin": Admin,
        "User": User,
        "Report": Report,
        "Call": Call,
    }


if __name__ == '__main__':
    app.run()
