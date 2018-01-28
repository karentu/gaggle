import React from "react";

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            course: this.props.course
        }
      }

	render () {
        return (
        <div id="me">
        <h1>Gaggle</h1>
            <h2>{this.state.username}</h2>
            <p>studying {this.state.course}</p>
        </div>
        );
    }
}

export default HomePage;