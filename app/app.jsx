
/*

They say great science is built on the shoulders of giants. Not here.
We do all our science from scratch! No hand holding

*/

//App
class App extends React.Component {
    constructor(props) {
        super(props);

        var chunkSize = 16;

        //temp stuff
		var _chunks = new Array();
		var _data = this.props.data;

		for (var i = 0; i < _data.length; i += chunkSize) {
		    _chunks.push(_data.slice(i, i+chunkSize));
		}


        this.state = {
            currentFilename: '',
            chunkSize: 16,
            data: _data,
            chunks: _chunks,
            offset: 0,
            chunks: _chunks,
            selectedCellId: null, // format:  row:col   , 3:4
            selectedCellPosition: 0 // values are - 0 or 1;  left or right
        };

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
    componentDidMount() {


    }
    componentDidUpdate() {

    }

    handleScroll(e) {

        if (e.deltaY >= 0) { //Down

        	//console.log(this.state.chunks.length);
        	//230
        	//if (this.state.chunks.length > this.state.offset)

            this.setState({
                offset: this.state.offset + 1
            });
        } else {
            this.setState({
                offset: Math.max(0, this.state.offset - 1)
            });
        }
        e.preventDefault();
    }
    ReadFile() {

        var file = document.getElementById('hexview-input').files[0];
        //var file = $('#f-input')[0].files[0];

        //$('#open-file-filename').text(file.name);
        this.setState({currentFilename: file.name});
        var reader = new FileReader();
        reader.onload = function(e) {




            var _chunks = new Array();
            var _data = new Uint8Array(reader.result);

            for (var i = 0; i < Math.ceil(_data.length); i += 16) {
                _chunks.push(_data.slice(i, i+16));
            }

            this.setState({
                data: _data,
                chunks: _chunks
            });

            //this.setState(reader.result);
            //$('#test-container').html( BuildHexView(new Uint8Array(reader.result)) );
            //ReactDOM.render(React.createElement(App, { data: reader.result }), document.getElementById('n-hexview'));

        }.bind(this);




        reader.readAsArrayBuffer(file);

    }
}
App.propTypes = {

};
App.defaultProps = {

};


//DATA VIEW

class DataView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {

		};

	}

	render() {
		var rows = Array();
        var rowSize = 16; // can be modified in the future ;3

        var rowCount = Math.ceil(this.props.data.hexData.length / rowSize);

        for (var y = 0; y < rowCount; y++) {
        	var _rowKey = y + this.props.data.firstChunkIndex;

        	var row = Array();
        	for (var x = 0; x < rowSize; x++) {
        		row.push(this.props.data.hexData[ (y * rowSize) + x ]);
        	}

        	var rowData = {data: row, rowKey: _rowKey};
        	rows.push(
    			<DataRow data={rowData} key={_rowKey} selectedCell={this.props.selectedCell} />
    		);
        }
        return (
            <div className="data-view card">
                <div className="data-head">
                    <div>0 1 2 3 4 5 6 7 8 9 A B C D E F</div>
                </div>
                {rows}
            </div>
        );
	}
}

//DATA ROW
class DataRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        //var cols = {};

        var cols = this.props.data.data.map(function(v, i){
            return (
                <DataCell data={v}  key={i} dataKey={this.props.data.rowKey + ':' + i}  selectedCell={this.props.selectedCell} />
            );
        }.bind(this));

        var offset = (this.props.data.rowKey << 4);
        offset = ("0000" + offset.toString(16)).substr(-4) + ':';

        return (
            <div className="hex-row">
                <div className="hex-data-row">
                    {cols}
                </div>
            </div>
        );
    }

}
class DataCell extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.props.selectedCell.selectedCellId == this.props.dataKey)
            this.props.selectedCell.handleCellEdit(null);
        else
            this.props.selectedCell.handleCellEdit(this.props.dataKey);
    }

    render() {
        //var hVal = ("00" + parseInt(this.props.data, 10).toString(16)).substr(-2);
        var hVal = String.fromCharCode(this.props.data);

        var selected = this.props.selectedCell.selectedCellId == this.props.dataKey ? true : false;
        var position = this.props.selectedCell.selectedCellPosition;


		if (this.props.data != undefined) {
	        return (
	            <span
	                className={`${(selected ? 'edit': '')} data-cell`}
	                data-key={this.props.dataKey}
	                onClick={this.handleClick}>
	                {hVal}
	            </span>
	        );
		}
	    else {
	    	return (null);
	    }
    }

}


//
//
// HEXVIEW
//
//
class HexView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        //console.log(this.props.data);

        document.addEventListener("keydown", function(e){
        	if (e.keyCode == 8) e.preventDefault();

        	this.props.handleCellEdit(this.props.selectedCell.selectedCellId, e.keyCode);
            e.preventDefault();
        }.bind(this));

        document.addEventListener('keyup', function(e) {
        	//console.log('e.keyCode : ' + e.keyCode);

        	//this.props.handleCellEdit(this.props.selectedCell.selectedCellId, e.keyCode);
            e.preventDefault();

        }.bind(this));
    }

    setEditState(id) {
        this.setState({
            editId: id
        });
    }

    render() {

        var rows = Array();
        var rowSize = 16; // can be modified in the future ;3

        var rowCount = Math.ceil(this.props.data.hexData.length / rowSize);

        for (var y = 0; y < rowCount; y++) {
        	var _rowKey = y + this.props.data.firstChunkIndex;

        	var row = Array();
        	for (var x = 0; x < rowSize; x++) {
        		row.push(this.props.data.hexData[ (y * rowSize) + x ]);
        	}

        	var rowData = {data: row, rowKey: _rowKey};
        	rows.push(
    			<HexRow data={rowData} key={_rowKey} selectedCell={this.props.selectedCell} />
    		);
        }

		/*
        for (var i in this.props.data.hexData) {

            if ((i % rowSize == 0) && (i != 0)) {
                //var rowKey = (i / 16) - 1;
                var rowKey = (i / rowSize) + this.props.data.firstChunkIndex - 1;

                var rowData = {data: row, rowKey: rowKey};
                rows.push(
                    <HexRow data={rowData} key={rowKey} selectedCell={this.props.selectedCell} />
                );
                row = Array();
            }
            var val = this.props.data.hexData[i];
            row.push(val);

        }
        */

        return (
            <div className="hex-view card">
                <div className="hex-head">
                    <div></div>
                    <div>00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F</div>
                </div>
                {rows}
            </div>
        );
    }
}

//HexRow
class HexRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        var cols = this.props.data.data.map(function(v, i){
            return (
                <HexCell data={v}  key={i} dataKey={this.props.data.rowKey + ':' + i}  selectedCell={this.props.selectedCell} />
            );
        }.bind(this));

        var offset = (this.props.data.rowKey << 4);
        offset = ("0000" + offset.toString(16)).substr(-4) + ':';

        return (
            <div className="hex-row">

                <span className="hex-col-start">{offset}</span>
                <div className="hex-data-row">
                    {cols}
                </div>
            </div>
        );
    }

}

//HexCell
class HexCell extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.props.selectedCell.selectedCellId == this.props.dataKey)
            this.props.selectedCell.handleCellEdit(null);
        else
            this.props.selectedCell.handleCellEdit(this.props.dataKey);
    }

    render() {
        var hVal = ("00" + parseInt(this.props.data, 10).toString(16)).substr(-2);

        var position = 0;
        var selected = this.props.selectedCell.selectedCellId == this.props.dataKey ? true : false;

        if (selected) {
		    position = this.props.selectedCell.selectedCellPosition;;
		}

		if (this.props.data != undefined) {
	        return (
	            <span
	                className={`${(selected ? 'edit': '')} hex-cell pos${position}`}
	                data-key={this.props.dataKey}
	                onClick={this.handleClick}>
	                {hVal}
	            </span>
	        );
		}
	    else {
	    	//return (null);
	    	return (<span className="hex-cell" />);
	    }
    }

}
HexCell.propTypes = {};
HexCell.defaultProps = {};


function ready(fn) {
    if (document.readyState != 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
}

ready(() => {

	var testData = new Uint8Array(new ArrayBuffer(0x285));

	for (var i = 0; i < testData.length; i++) {
		testData[i] = i;
		//testData[i] = Math.floor(Math.random() * 256);
	}

	ReactDOM.render(
	  <App data={testData} />,
	  document.getElementById('app')
	);
});
