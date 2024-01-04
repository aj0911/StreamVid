from flask import jsonify

def return_json(message,status_code,data):
    response =  jsonify({
        'message':message,
        'status':status_code,
        'data':data
    })
    response.headers.add("Access-Control-Allow-Origin", "*");
    return response;