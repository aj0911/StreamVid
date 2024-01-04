from Users.models import User
from flask import Blueprint,request
import json

user_route = Blueprint('__name__','user')

@user_route.route('/register',methods=['POST'])
def register():
    return User().register();

@user_route.route('/login',methods=['POST'])
def login():
    return User().login();

@user_route.route('/update_subscription',methods=['POST'])
def update_subscription():
    return User().update_subscription();