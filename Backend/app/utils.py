from flask import jsonify, current_app
from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt

def custom_response(message, status_code=200, data=None):
    response = {
        'status': 'success' if 200 <= status_code < 300 else 'error',
        'message': message
    }
    if data is not None:
        response['data'] = data
    return jsonify(response), status_code

def validate_admin_access(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        claims = get_jwt()
        if not claims.get('is_admin', False):
            return custom_response('Admin access required', 403)
        return fn(*args, **kwargs)
    return wrapper

def handle_validation_error(error):
    return jsonify({
        'status': 'error',
        'message': 'Validation error',
        'errors': error.messages
    }), 400
