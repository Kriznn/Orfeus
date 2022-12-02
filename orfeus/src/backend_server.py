from flask import Flask
from flask import request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy import select
from sqlalchemy import insert
from sqlalchemy.orm import Session
from datetime import datetime
from sqlalchemy import Table, Column, Integer, String, MetaData
import json
meta = MetaData()
user = Table(
   'user', meta, 
   Column('id', Integer, primary_key = True), 
   Column('username', String), 
   Column('password', String), 
   Column('email', String), 
   Column('role', Integer), 
   Column('privacy_level', Integer), 
   Column('profile_picture_path', String), 
   Column('account_creation_date', String), 
)
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@127.0.0.1:3306/mydb'
engine = create_engine("mysql+pymysql://root:root@127.0.0.1:3306/mydb", echo=True)
db = SQLAlchemy(app)
CORS(app)

@app.route('/register', methods=['POST'])
def register():
    my_json = request.get_data().decode('utf8')
    data = json.loads(my_json)
    # s = json.dumps(data, indent=4, sort_keys=True)
    stmt = (
        db.insert(user).values(username=data[0]["value"], password=data[1]["value"],email=data[2]["value"],role=1,privacy_level=1,profile_picture_path="fakepath",account_creation_date=datetime.now())
    )
    print(stmt.compile().params)
    conn = engine.connect()
    result = conn.execute(stmt)
    print(result)
    return "flask server" 


if __name__ == "__main__":
    app.run(port=5000, debug=True)