from decouple import config
import os

BASE_DIR = os.path.dirname(os.path.realpath(__file__))

class Config:
    SECRET_KEY = config("SECRET_KEY")
    SQLALCHEMY_TRACK_MODIFICATIONs=config('SQLALCHEMY_TRACK_MODIFICATIONS',cast=bool)

class DevConfig(Config):
    SQLALCHEMY_DATABASE_URI ="postgresql://ireporter_db_user:feX1agtrdJN9Wtjaa6CRCSQcXCxpZsZT@dpg-cjms21fjbvhs73ecjqq0-a.oregon-postgres.render.com/ireporter_db"
    # +os.path.join(BASE_DIR, 'report.db')
    DEBUG=True
    SQLALCHEMY_ECHO = True