import React from 'react';
import ReactDOM from 'react-dom';
import axioslib from 'axios';


console.log('Weewoo!');


const API_HOST = 'localhost';
const API_PORT = '8080';
const API_SCHEME = 'http';

const API_URL = API_SCHEME + '://' + API_HOST + ':' + API_PORT;

const axios = axioslib.create({baseURL: API_URL});

class App extends React.Component {
	constructor(props) {
		super(props);

	// this.saveStatement = this.saveStatement.bind(this);

		this.queryKeyDown = this.queryKeyDown.bind(this);
		this.statementKeyDown = this.statementKeyDown.bind(this);
	}

	saveStatement() {

		if (this.inputStatement == null) return;
		if (this.inputAnswer == null) return;

		if (this.inputStatement.value.length < 3) return;
		if (this.inputAnswer.value.length < 2) return;


		console.log(this.inputStatement.value);

		axios.post('/save', {
			s: this.inputStatement.value,
			a: this.inputAnswer.value
		})
		.then(function (response) {
			console.log(response);
			this.inputStatement.value = "";
			this.inputAnswer.value = "";
		}.bind(this))
		.catch(function (error) {
			if (error.response) {
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			} else {
			// Something happened in setting up the request that triggered an Error
				console.log('Error', error.message);
			}
			console.log(error.config);
		});


	}

	handleAsk() {
		if (this.inputQuery == null) return;

		axios.post('/query', {
			q: this.inputQuery.value
		})
		.then(function(res) {
			console.log(res);
			this.outputLog.value = res.data.answer + "\n" + this.outputLog.value;
			this.inputQuery.value = "";
		}.bind(this))
		.catch(function(error) {
			if (error.response) {
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			} else {
			// Something happened in setting up the request that triggered an Error
				console.log('Error', error.message);
			}
			console.log(error.config);
		});

	}
	statementKeyDown(e) {
		if (e.keyCode == 13) {
			this.saveStatement();
			this.inputStatement.focus();
		}

	}
	queryKeyDown(e) {
		if (e.keyCode == 13) this.handleAsk();

	}
  	render() {

		var logStyle = {
			width: '30em',
			height: 'calc(1.15em * 20)'
		};

	    return (
				<div>
					<div>
						<p>Memory database <span></span></p>
						<input type="text" placeholder="" ref={(r) => this.inputStatement = r} onKeyDown={this.statementKeyDown} />
						<span>is</span>
						<input type="text" placeholder="" ref={(r) => this.inputAnswer = r } onKeyDown={this.statementKeyDown} />
						<button onClick={() => this.saveStatement()}>save</button>
					</div>
					<div>
						<p>Question</p>
						<input type="text" ref={(r) => this.inputQuery = r } onKeyDown={this.queryKeyDown}/>
						<button onClick={() => this.handleAsk()}>ask</button>
					</div>
					<div>
						<h3>Log</h3>

						<textarea style={logStyle} id="log" ref={(r) => this.outputLog = r}></textarea>
					</div>
				</div>
	    );
  	}
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
