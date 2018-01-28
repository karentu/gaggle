# server.py
from flask import Flask, render_template, request
import requests, json

MAPS_API_KEY = 'AIzaSyDWrVe0DPmRHlmCUjIf1gQ_Dkij-FQV4Hk'
import re, sqlite3, traceback

app = Flask(__name__, static_folder="fullstack_template/static/dist", \
	template_folder="fullstack_template/static")

sortedBuddies = []

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/home/<username>+<course>")
def home(username=None, course=None):
	return render_template("home.html", username=username, course=course, data=sortedBuddies)

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

	buddies = sequel(username, course, lat, lon) # all users with same course
	sortedBuddies = sortUsersByDistance(lat, lon, buddies)
	print(sortedBuddies)

	return username + "," + course



def sequel(username, course, lat, lon):
	try:
		with sqlite3.connect("database.db") as con:
			cur = con.cursor()
			cur.execute("INSERT INTO users (username, course, lat, lon) VALUES (?, ?, ?, ?)",
			 (username, course, lat, lon))
			con.commit()
			print("User successfully added")
	except Exception as e:
		# not really updating?
		if e == "UNIQUE constraint failed: user.username":
			cur.execute("UPDATE users SET course = ?, lat = ?, lon = ? WHERE username = ?",
			 (course, lat, lon, username))
		con.rollback()
		print(e)
	finally:
		con.close()

	rows = []

	try:
		with sqlite3.connect("database.db") as con:
			cur = con.cursor()			
			cur.execute("SELECT * FROM users WHERE course = ? AND username != ?", 
				(course, username))
			rows = cur.fetchall()
	except Exception as e:
		con.rollback()
		print(e)
	finally:
		con.close()

	return rows


def sortUsersByDistance(lat, lon, usersArray):
	users = [] # list of (user, distance)
	myOrigin = (lat, lon)
	for u in usersArray: # (user, course, lat, lon)
		destin = (u[2], u[3])
		(distance, val) = findDistance(myOrigin, destin)
		users.append((u[0], distance, val))
	print(users)

	users = sorted(users, key=lambda x: x[2])
	print(users)
	return users


def findDistance(origin, destination):
	url = ('https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + str(origin[0]) + ',' + str(origin[1])	+ '&destinations=' + str(destination[0]) + ',' + str(destination[1])
		+ '&mode=walking'
		+ '&key=' + MAPS_API_KEY)

	response = requests.get(url)
	parsed_json = json.loads(response.content)
	if parsed_json['status'] == 'OK':
		val = parsed_json['rows'][0]['elements'][0]['duration']['value']
		distance = parsed_json['rows'][0]['elements'][0]['duration']['text']
		return (distance, val)
	else:
		print(parsed_json)
		return (-1, -1)

@app.before_first_request
def make_db():
	conn = sqlite3.connect('database.db')
	conn.execute('CREATE TABLE IF NOT EXISTS users (username TEXT, course TEXT, lat DECIMAL, lon DECIMAL)')
	conn.close()

if __name__ == "__main__":
	make_db()
	app.run(debug=True)