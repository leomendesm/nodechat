import React, { Component } from 'react';
import './App.css';

class App extends Component {
	render() {
	    return (
		<div className="App">
			<div className="wrapper">
				<div className="form">
					<h1>Node Chat</h1>
					<br />
					<input placeholder="Username" className="input" type="text"/>
					<input placeholder="Password" className="input" type="password"/>
					<br />
					<div className="post-form">
						<a href="/forgot">Forgot Password?</a>
						<input className="submit" value="LOGIN" type="submit"/>
					</div>
					<div className="hr"></div>
					<div className="post-form">
						<input className="submit" value="CREATE YOUR ACCOUNT" type="submit"/>
					</div>
				</div>
			</div>
		</div>
	    );
	}
}

export default App;
