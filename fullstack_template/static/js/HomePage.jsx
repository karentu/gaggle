import React from "react";

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            course: this.props.course,
            data: this.props.data,
            profile: "",
            profilepics: ["images/Goose1.png", "images/Goose2.png", 
                "images/Goose3.png", "images/Goose4.png"]
        }
      }

    pickProfile() {
        this.setState({profile: this.state.profilepics[Math.floor(Math.random() * 
            this.state.profilepics.length)]});
    }


	render () {
        console.log(data);
        return (
        <div className="page">
            <div className="me">
                <img src={this.state.profile} className="profile" />
                <h2>{this.state.username}</h2>
                <p>studying {this.state.course}</p>
            </div>
            <div className="list">
            <p>Geese and gaggles nearby</p>
            </div>
        </div>
        );
    }
}

export default HomePage;