from flask import jsonify


def json_response(status: str, message: str, data=None, code: int = 200):
    """Return a consistent JSON response payload."""

    payload = {
        "status": status,
        "message": message,
        "data": data,
    }
    return jsonify(payload), code
