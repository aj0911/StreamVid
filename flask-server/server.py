from flask import Flask

app = Flask(__name__);

# Routes
from Users.routes import user_route

# Connection with routes
app.register_blueprint(user_route,url_prefix='/user');


# Execution
if __name__ == '__main__':
    app.run(debug = True);