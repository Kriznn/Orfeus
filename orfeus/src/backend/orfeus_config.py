from flask import Flask
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData, create_engine


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:pollo1216@127.0.0.1:3306/mydb'
engine = create_engine(
    "mysql+pymysql://root:pollo1216@127.0.0.1:3306/mydb", echo=True)
app.config['JWT_SECRET_KEY'] = 'key'  # Change this!
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 180
db = SQLAlchemy()
meta = MetaData()
jwt = JWTManager(app)