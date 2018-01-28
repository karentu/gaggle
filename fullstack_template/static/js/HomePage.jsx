import React from "react";
import User from "./User";

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            course: this.props.course,
            profile: "",
            profilepics: ["../images/Goose1.png", "../images/Goose2.png", 
                "../images/Goose3.png", "..//Goose4.png"]
        };

        this.renderList = this.renderList.bind(this);
        this.pickProfile = this.pickProfile.bind(this);
      }

    pickProfile() {
        this.setState({profile: this.state.profilepics[Math.floor(Math.random() * 
            this.state.profilepics.length)]});
    }

    renderList() { 
       var str = this.props.data.replace(/&#39;/g, "\"");
        var data = JSON.parse(str);
        
        var builder = [];
        for (var key in data) {
            var user = [key, data[key]];
            builder.push(user);
        }

        const final = builder.map(item => {
            return <User username={item[0]} distance={item[1]} />
        });

        return final;
    }


	render () {
        return (
        <div className="page">
            <div className="me">
                <img src={require('../images/Goose1.png')} className="profile" />
                <h2>{this.state.username}</h2>
                <p>studying {this.state.course}</p>
            </div>
            <div className="list">
            <p>Geese and gaggles nearby:</p>
            {this.renderList()}
            </div>
        </div>
        );
    }
}

export default HomePage;