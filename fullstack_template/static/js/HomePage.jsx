import React from "react";

class HomePage extends React.Component {

constructor(props) {
    super(props);
    this.state = {
        name: this.props.username,
        course: this.props.course
    }

  }

	render () {
        return (
        <div>
        <h1>Gaggle</h1>
        <h2>{this.state.name}</h2>
        <p>studying {this.state.course}</p>
        </div>
        );
    }
}

export default HomePage;