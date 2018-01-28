import React from "react";
import Form from "./Form";

class App extends React.Component {
  render () {
    return (
    	<div>
    		<div className='header'>
            <img src={require("../images/gooselogo.png")} className='logo' />
    		</div>
    		<Form />
    	</div>
    )
  }
}

export default App;
