from flask import jsonify,request
from passlib.hash import pbkdf2_sha256
import uuid
import json
from db_config import db
from Helper.Helper import return_json

class User:
    def register(self):
        try:
            body = json.loads(request.data);
            user = {
                '_id':uuid.uuid4().hex,
                'name':body.get('name'),
                'email':body.get('email'),
                'password':pbkdf2_sha256.encrypt(body.get('password'))
            }
            if db.users.find_one({'email':user['email']}):
                return return_json('User already exists.',400,user);
            if db.users.insert_one(user):
                return return_json('Register successfull',200,user);
        except Exception as ex:
            return_json(ex.message,500,None);

    def login(self):
        try:
            body = json.loads(request.data);
            user = db.users.find_one({'email':body.get('email')});
            if user and pbkdf2_sha256.verify(body.get('password'),user['password']):
                return return_json('Login successfull',200,user);
            return return_json('Invalid login credentials',400,None);
        except Exception as ex:
            return_json(ex,500,None);