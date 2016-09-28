
/*

They say great science is built on the shoulders of giants. Not here.
We do all our science from scratch! No hand holding

*/

//App
class App extends React.Component {
  constructor(props) {
    super(props);

    this.saveStatement = this.saveStatement.bind(this);
  }

	saveStatement() {
		console.log(':D');

		if (this.inputStatement == null) return;
		if (this.inputAnswer == null) return;

		if (this.inputStatement.value.length < 3) return;
		if (this.inputAnswer.value.length < 3) return;


		console.log(this.inputStatement.value);

		this.inputStatement.value = "";
		this.inputAnswer.value = "";
	}

	handleAsk() {

	}

  render() {
    return (
			<div>
				<div>
					<p>Memory database <span></span></p>
					<input type="text" placeholder="The color of my car" ref={(r) => this.inputStatement = r}/>
					<span>is</span>
					<input type="text" placeholder="white" ref={(r) => this.inputAnswer = r } />
					<button onClick={this.saveStatement}>save</button>
				</div>
				<div>
					<p>Question</p>
					<input type="text" />
					<button onClick={this.handleAsk}>ask</button>
				</div>
			</div>
    );
  }
}

	ReactDOM.render(
    <App data={testData} />,
    document.getElementById('app')
	);
});
