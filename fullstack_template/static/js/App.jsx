import React from "react";
import Form from "./Form";

class App extends React.Component {
  render () {
    return (
    	<div>
    		<div className='header'>
    			<h1>Gaggle</h1>
    		</div>
    		<Form />
    	</div>
    )
  }
}

export default App;