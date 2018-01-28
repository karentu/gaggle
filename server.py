# server.py
from flask import Flask, render_template, request
import requests

MAPS_API_KEY = 'AIzaSyDWrVe0DPmRHlmCUjIf1gQ_Dkij-FQV4Hk'

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

def findDistance(origin, destination):
	to_return = []
	url = ('https://maps.googleapis.com/maps/api/distancematrix/json?origin=' + str(origin[0]) + ',' + str(origin[1])
		+ '&destinations=' + str(destination[0]) + ',' + str(destination[1])
		+ '&mode=walking'
		+ '&key=' + MAPS_API_KEY)

	response = requests.get(url)
	parsed_json = json.loads(response.content)
	if parsed_json['status'] == 'OK':
		distance = parsed_json['rows']['elements']['duration']['text']
		return distance
	else:
		print(response)
		return -1


if __name__ == "__main__":
    app.run()