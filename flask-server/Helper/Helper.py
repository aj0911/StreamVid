from flask import jsonify

def return_json(message,status_code,data):
    return jsonify({
        'message':message,
        'status':status_code,
        'data':data
    })