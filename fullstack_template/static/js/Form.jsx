import React from 'react';

var $ = require('jquery');

class Form extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			course: ''};

		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeCourse = this.handleChangeCourse.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChangeName(event) {
		this.setState({name: event.target.value});
	}

	handleChangeCourse(event) {
		this.setState({course: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();

		var data = {
			name: this.state.name,
			course: this.state.course
		};

		$.ajax({
		      type:"POST",
		      url:$SCRIPT_ROOT + "/_info",
		      data: JSON.stringify(data),
		      contentType: 'application/json',
		      success: (data) => {
		        if ((data !== "ERROR")) {
		        	var info = data.split(",");
		        	window.location.assign("home/" + info[0] + "+" + info[1]);
		        } else {
		        	alert("Please enter a course code in the following format: AAAA0000."); // change later
		        };
		      },
		      error: (data) => {
		      }
		    });
	}


	render() {
		return (
			<form onSubmit={this.handleSubmit}>
			
				<p>What's your name?</p>
				<input type="text" value={this.state.name}
				onChange={this.handleChangeName} />
				<br />

				<p>What are you studying?</p>
				<input type="text" value={this.state.course}
				onChange={this.handleChangeCourse} />
				<br />

				<input className="button" type="submit" value="Submit" />

			</form>

			)
	}


}

export default Form;