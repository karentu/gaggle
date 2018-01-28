# server.py
from flask import Flask, render_template, request

import re

app = Flask(__name__, static_folder="fullstack_template/static/dist", \
	template_folder="fullstack_template/static")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/home/<username>+<course>")
def home(username=None, course=None):
	return render_template("home.html", username=username, course=course)

# need to put username and course into a database


@app.route("/_info", methods=['GET', 'POST'])
def driver():
	content = request.get_json()
	name = content['name']
	course = re.fullmatch('([A-Z]){4}([0-9]){4}([A-Z])?', content['course'])
	if not course or not name:
		return 'ERROR'

	print(name, course.group())
	return name + "," + course.group()


if __name__ == "__main__":
    app.run()