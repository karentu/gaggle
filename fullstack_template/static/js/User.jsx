import React from 'react';

class User extends React.Component {
	
	constructor(props) {
	    super(props);
	    this.state = {
	        username: this.props.username,
	        distance: this.props.distance
	    }
	  }

	render () {
        return (
        <div className="user">
        <h2>{this.state.username}</h2>
        <p>{this.state.distance} away</p>
        </div>
        );
    }


} 

export default User;