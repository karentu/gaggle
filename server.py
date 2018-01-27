# server.py
from flask import Flask, render_template, request
# import requests

app = Flask(__name__, static_folder="fullstack_template/static/dist", \
	template_folder="fullstack_template/static")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/hello")
def hello():
    return "Hello World!"


@app.route("/_info", methods=['GET', 'POST'])
def driver():
	content = request.get_json()
	print(content)
	return 'OK'
	# content = request.get_json()


if __name__ == "__main__":
    app.run()