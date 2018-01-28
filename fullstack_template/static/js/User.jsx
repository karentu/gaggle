import React from 'react';
import goose1 from '../images/Goose1.png';
import goose2 from '../images/Goose2.png';
import goose3 from '../images/Goose3.png';
import goose4 from '../images/Goose4.png';

class User extends React.Component {
	
	constructor(props) {
	    super(props);
	    this.state = {
	        username: this.props.username,
	        distance: this.props.distance,
	        num: this.props.num
	    }


	  }



	render () {
		var images = [goose1, goose2, goose3, goose4];
        var propic = images[Math.floor(Math.random() * 
            images.length)];

        return (
        <div className="user">
        	<img src={propic} className="profile" />
        	<h2>{this.state.username}</h2>
        	<p>{this.state.distance} away</p>
        	<p>{this.state.num}</p>
        </div>
        );
    }


} 

export default User;