'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*

TODO: Save data file

*/

//App
var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        var _this$state;

        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        var chunkSize = 16;

        //temp stuff
        var _chunks = new Array();
        var _data = _this.props.data;

        for (var i = 0; i < _data.length; i += chunkSize) {
            _chunks.push(_data.slice(i, i + chunkSize));
        }

        _this.state = (_this$state = {
            currentFilename: '',
            chunkSize: 16,
            data: _data,
            chunks: _chunks,
            offset: 0
        }, _defineProperty(_this$state, 'chunks', _chunks), _defineProperty(_this$state, 'selectedCellId', null), _defineProperty(_this$state, 'selectedCellPosition', 0), _this$state);

        _this.saveStatement = _this.saveStatement.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: 'saveStatement',
        value: function saveStatement() {
            console.log(':D');

            if (this.inputStatement == null) return;
            if (this.inputAnswer == null) return;

            if (this.inputStatement.value.length < 3) return;
            if (this.inputAnswer.value.length < 3) return;

            console.log(this.inputStatement.value);

            this.inputStatement.value = "";
            this.inputAnswer.value = "";
        }
    }, {
        key: 'handleAsk',
        value: function handleAsk() {}
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'p',
                        null,
                        'Memory database ',
                        React.createElement('span', null)
                    ),
                    React.createElement('input', { type: 'text', placeholder: 'The color of my car', ref: function ref(r) {
                            return _this2.inputStatement = r;
                        } }),
                    React.createElement(
                        'span',
                        null,
                        'is'
                    ),
                    React.createElement('input', { type: 'text', placeholder: 'white', ref: function ref(r) {
                            return _this2.inputAnswer = r;
                        } }),
                    React.createElement(
                        'button',
                        { onClick: this.saveStatement },
                        'save'
                    )
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'p',
                        null,
                        'Question'
                    ),
                    React.createElement('input', { type: 'text' }),
                    React.createElement(
                        'button',
                        { onClick: this.handleAsk },
                        'ask'
                    )
                )
            );
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {}
    }, {
        key: 'handleScroll',
        value: function handleScroll(e) {

            if (e.deltaY >= 0) {
                //Down

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
    }, {
        key: 'ReadFile',
        value: function ReadFile() {

            var file = document.getElementById('hexview-input').files[0];
            //var file = $('#f-input')[0].files[0];

            //$('#open-file-filename').text(file.name);
            this.setState({ currentFilename: file.name });
            var reader = new FileReader();
            reader.onload = function (e) {

                var _chunks = new Array();
                var _data = new Uint8Array(reader.result);

                for (var i = 0; i < Math.ceil(_data.length); i += 16) {
                    _chunks.push(_data.slice(i, i + 16));
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
    }]);

    return App;
}(React.Component);

App.propTypes = {};
App.defaultProps = {};

//DATA VIEW

var DataView = function (_React$Component2) {
    _inherits(DataView, _React$Component2);

    function DataView(props) {
        _classCallCheck(this, DataView);

        var _this3 = _possibleConstructorReturn(this, (DataView.__proto__ || Object.getPrototypeOf(DataView)).call(this, props));

        _this3.state = {};

        return _this3;
    }

    _createClass(DataView, [{
        key: 'render',
        value: function render() {
            var rows = Array();
            var rowSize = 16; // can be modified in the future ;3

            var rowCount = Math.ceil(this.props.data.hexData.length / rowSize);

            for (var y = 0; y < rowCount; y++) {
                var _rowKey = y + this.props.data.firstChunkIndex;

                var row = Array();
                for (var x = 0; x < rowSize; x++) {
                    row.push(this.props.data.hexData[y * rowSize + x]);
                }

                var rowData = { data: row, rowKey: _rowKey };
                rows.push(React.createElement(DataRow, { data: rowData, key: _rowKey, selectedCell: this.props.selectedCell }));
            }
            return React.createElement(
                'div',
                { className: 'data-view card' },
                React.createElement(
                    'div',
                    { className: 'data-head' },
                    React.createElement(
                        'div',
                        null,
                        '0 1 2 3 4 5 6 7 8 9 A B C D E F'
                    )
                ),
                rows
            );
        }
    }]);

    return DataView;
}(React.Component);

//DATA ROW


var DataRow = function (_React$Component3) {
    _inherits(DataRow, _React$Component3);

    function DataRow(props) {
        _classCallCheck(this, DataRow);

        var _this4 = _possibleConstructorReturn(this, (DataRow.__proto__ || Object.getPrototypeOf(DataRow)).call(this, props));

        _this4.state = {};
        return _this4;
    }

    _createClass(DataRow, [{
        key: 'render',
        value: function render() {
            //var cols = {};

            var cols = this.props.data.data.map(function (v, i) {
                return React.createElement(DataCell, { data: v, key: i, dataKey: this.props.data.rowKey + ':' + i, selectedCell: this.props.selectedCell });
            }.bind(this));

            var offset = this.props.data.rowKey << 4;
            offset = ("0000" + offset.toString(16)).substr(-4) + ':';

            return React.createElement(
                'div',
                { className: 'hex-row' },
                React.createElement(
                    'div',
                    { className: 'hex-data-row' },
                    cols
                )
            );
        }
    }]);

    return DataRow;
}(React.Component);

var DataCell = function (_React$Component4) {
    _inherits(DataCell, _React$Component4);

    function DataCell(props) {
        _classCallCheck(this, DataCell);

        var _this5 = _possibleConstructorReturn(this, (DataCell.__proto__ || Object.getPrototypeOf(DataCell)).call(this, props));

        _this5.state = {};
        _this5.handleClick = _this5.handleClick.bind(_this5);
        return _this5;
    }

    _createClass(DataCell, [{
        key: 'handleClick',
        value: function handleClick() {
            if (this.props.selectedCell.selectedCellId == this.props.dataKey) this.props.selectedCell.handleCellEdit(null);else this.props.selectedCell.handleCellEdit(this.props.dataKey);
        }
    }, {
        key: 'render',
        value: function render() {
            //var hVal = ("00" + parseInt(this.props.data, 10).toString(16)).substr(-2);
            var hVal = String.fromCharCode(this.props.data);

            var selected = this.props.selectedCell.selectedCellId == this.props.dataKey ? true : false;
            var position = this.props.selectedCell.selectedCellPosition;

            if (this.props.data != undefined) {
                return React.createElement(
                    'span',
                    {
                        className: (selected ? 'edit' : '') + ' data-cell',
                        'data-key': this.props.dataKey,
                        onClick: this.handleClick },
                    hVal
                );
            } else {
                return null;
            }
        }
    }]);

    return DataCell;
}(React.Component);

//
//
// HEXVIEW
//
//


var HexView = function (_React$Component5) {
    _inherits(HexView, _React$Component5);

    function HexView(props) {
        _classCallCheck(this, HexView);

        var _this6 = _possibleConstructorReturn(this, (HexView.__proto__ || Object.getPrototypeOf(HexView)).call(this, props));

        _this6.state = {};

        //console.log(this.props.data);

        document.addEventListener("keydown", function (e) {
            if (e.keyCode == 8) e.preventDefault();

            this.props.handleCellEdit(this.props.selectedCell.selectedCellId, e.keyCode);
            e.preventDefault();
        }.bind(_this6));

        document.addEventListener('keyup', function (e) {
            //console.log('e.keyCode : ' + e.keyCode);

            //this.props.handleCellEdit(this.props.selectedCell.selectedCellId, e.keyCode);
            e.preventDefault();
        }.bind(_this6));
        return _this6;
    }

    _createClass(HexView, [{
        key: 'setEditState',
        value: function setEditState(id) {
            this.setState({
                editId: id
            });
        }
    }, {
        key: 'render',
        value: function render() {

            var rows = Array();
            var rowSize = 16; // can be modified in the future ;3

            var rowCount = Math.ceil(this.props.data.hexData.length / rowSize);

            for (var y = 0; y < rowCount; y++) {
                var _rowKey = y + this.props.data.firstChunkIndex;

                var row = Array();
                for (var x = 0; x < rowSize; x++) {
                    row.push(this.props.data.hexData[y * rowSize + x]);
                }

                var rowData = { data: row, rowKey: _rowKey };
                rows.push(React.createElement(HexRow, { data: rowData, key: _rowKey, selectedCell: this.props.selectedCell }));
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

            return React.createElement(
                'div',
                { className: 'hex-view card' },
                React.createElement(
                    'div',
                    { className: 'hex-head' },
                    React.createElement('div', null),
                    React.createElement(
                        'div',
                        null,
                        '00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F'
                    )
                ),
                rows
            );
        }
    }]);

    return HexView;
}(React.Component);

//HexRow


var HexRow = function (_React$Component6) {
    _inherits(HexRow, _React$Component6);

    function HexRow(props) {
        _classCallCheck(this, HexRow);

        var _this7 = _possibleConstructorReturn(this, (HexRow.__proto__ || Object.getPrototypeOf(HexRow)).call(this, props));

        _this7.state = {};
        return _this7;
    }

    _createClass(HexRow, [{
        key: 'render',
        value: function render() {
            var cols = this.props.data.data.map(function (v, i) {
                return React.createElement(HexCell, { data: v, key: i, dataKey: this.props.data.rowKey + ':' + i, selectedCell: this.props.selectedCell });
            }.bind(this));

            var offset = this.props.data.rowKey << 4;
            offset = ("0000" + offset.toString(16)).substr(-4) + ':';

            return React.createElement(
                'div',
                { className: 'hex-row' },
                React.createElement(
                    'span',
                    { className: 'hex-col-start' },
                    offset
                ),
                React.createElement(
                    'div',
                    { className: 'hex-data-row' },
                    cols
                )
            );
        }
    }]);

    return HexRow;
}(React.Component);

//HexCell


var HexCell = function (_React$Component7) {
    _inherits(HexCell, _React$Component7);

    function HexCell(props) {
        _classCallCheck(this, HexCell);

        var _this8 = _possibleConstructorReturn(this, (HexCell.__proto__ || Object.getPrototypeOf(HexCell)).call(this, props));

        _this8.state = {};
        _this8.handleClick = _this8.handleClick.bind(_this8);
        return _this8;
    }

    _createClass(HexCell, [{
        key: 'handleClick',
        value: function handleClick() {
            if (this.props.selectedCell.selectedCellId == this.props.dataKey) this.props.selectedCell.handleCellEdit(null);else this.props.selectedCell.handleCellEdit(this.props.dataKey);
        }
    }, {
        key: 'render',
        value: function render() {
            var hVal = ("00" + parseInt(this.props.data, 10).toString(16)).substr(-2);

            var position = 0;
            var selected = this.props.selectedCell.selectedCellId == this.props.dataKey ? true : false;

            if (selected) {
                position = this.props.selectedCell.selectedCellPosition;;
            }

            if (this.props.data != undefined) {
                return React.createElement(
                    'span',
                    {
                        className: (selected ? 'edit' : '') + ' hex-cell pos' + position,
                        'data-key': this.props.dataKey,
                        onClick: this.handleClick },
                    hVal
                );
            } else {
                //return (null);
                return React.createElement('span', { className: 'hex-cell' });
            }
        }
    }]);

    return HexCell;
}(React.Component);

HexCell.propTypes = {};
HexCell.defaultProps = {};

function ready(fn) {
    if (document.readyState != 'loading') fn();else document.addEventListener('DOMContentLoaded', fn);
}

ready(function () {

    var testData = new Uint8Array(new ArrayBuffer(0x285));

    for (var i = 0; i < testData.length; i++) {
        testData[i] = i;
        //testData[i] = Math.floor(Math.random() * 256);
    }

    ReactDOM.render(React.createElement(App, { data: testData }), document.getElementById('app'));
});