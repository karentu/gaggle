# server.py
from flask import Flask, render_template, request

import re, sqlite3

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
	username = content['name']
	course = re.fullmatch('([A-Z]){4}([0-9]){4}([A-Z])?', content['course'])
	if not course or not username:
		return 'ERROR'

	course = course.group()

	lat = float(content['latitude'])
	lon = float(content['longitude'])

	try:
		with sqlite3.connect("database.db") as con:
			cur = con.cursor()
			cur.execute("INSERT INTO users (username, course, lat, lon) VALUES (?, ?, ?, ?)", (username, course, lat, lon))
			con.commit()
			print("User successfully added")
	except:
		con.rollback()
		print("Error in insert operation")

	finally:
		con.close() 

	return username + "," + course

@app.before_first_request
def make_db():
	conn = sqlite3.connect('database.db')
	conn.execute('CREATE TABLE IF NOT EXISTS users (username TEXT PRIMARY KEY, course TEXT, lat DECIMAL, lon DECIMAL)')
	conn.close()

if __name__ == "__main__":
	make_db()
	app.run(debug=True)