import React from "react";
import User from "./User";
import goose1 from '../images/Goose1.png';
import goose2 from '../images/Goose2.png';
import goose3 from '../images/Goose3.png';
import goose4 from '../images/Goose4.png';

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            course: this.props.course
        };

        this.renderList = this.renderList.bind(this);
      }

    renderList() { 
        console.log(this.props.data);

        const final = this.props.data.map(item => {
            return <User username={item["name"]} distance={item["distance"]}
             num={item["number"]} />;
        });

        return final;
    }


	render () {
        var images = [goose1, goose2, goose3, goose4];
        var propic = images[Math.floor(Math.random() * 
            images.length)];
        return (
        <div className="page">
            <div className="me">
                <img src={propic} className="profile" />
                <h2>{this.state.username}</h2>
                <p>studying {this.state.course}</p>
            </div>
            <div className="list">
            {this.renderList()}
            </div>
        </div>
        );
    }
}

export default HomePage;