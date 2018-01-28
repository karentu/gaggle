import React from 'react';

class User extends React.Component {
	
	constructor(props) {
	    super(props);
	    this.state = {
	        username: this.props.username,
	        course: this.props.course,
	        distance: this.props.distance
	    }
	  }

	render () {
        return (
        <div className="user">
        <h2>{this.state.username}</h2>
        <p>studying {this.state.course}</p>
        <p>{this.state.distance} mi away</p>
        </div>
        );
    }


} 

export default User;