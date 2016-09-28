/*
npm install --save natural prompt
*/


var express = require('express');
var app = express();


app.post('/save', function(req, res) {
	console.log(req);
	res.json({'test': false});
})
app.listen(3000);


var natural = require('natural'),

cl = new natural.BayesClassifier();



cl.events.on('trainedWithDocument', function (obj) {
	//console.log("\n");
	//console.log(obj);
	//console.log("\n");
	/* {
	*   total: 23 // There are 23 total documents being trained against
	*   index: 12 // The index/number of the document that's just been trained against
	*   doc: {...} // The document that has just been indexed
	*  }
	*/
});

//cl.addDocument('i am long qqqq', 'buy');
//cl.addDocument('buy the q\'s', 'buy');
//cl.addDocument('short gold', 'sell');
//cl.addDocument('sell gold', 'sell');


cl.addDocument("the name of chris' dog", 'tucker')
cl.addDocument('sloanes favorite food', 'mac n cheese');
cl.addDocument('sloanes cat name is', 'pablo')
cl.addDocument('the color of my nissan sentra', 'white');
cl.addDocument('car color', 'white');
cl.addDocument('car make', 'nissan');
cl.addDocument('car year', '2003');
cl.addDocument('car model', 'sentra');
cl.addDocument('phone brand', 'iphone');
cl.addDocument('phone model', '6s');

cl.addDocument('laptop', 'sony');
cl.addDocument('laptop brand', 'sony');
cl.addDocument('brand of', 'sony');

cl.addDocument('laptop color', 'black');
cl.addDocument('color of laptop', 'black');
cl.addDocument('drivers license', '12345');
cl.addDocument('license plate', 'abcdef');
cl.addDocument('license plate on nissan sentra 2003', 'abcdef');

cl.train();

console.log(cl.classify('what is the color of my car'));
console.log(cl.classify('what is the year of my car'));

console.log(cl.classify("what's the model of my phone"));

console.log(cl.classify('what color is my sentra?'));
console.log(cl.classify('what color is my laptop'));

console.log(cl.classify('my license plate number'))
console.log(cl.classify('whats my drivers license'))
console.log(cl.classify('chris '));

//console.log(cl.getClassifications('i am long copper'));


//cl.addDocument(['sell', 'gold'], 'sell');

cl.save('cl.json', function(err, cl) {
    // the cl is saved to the cl.json file!
});

/*
natural.BayesClassifier.load('cl.json', null, function(err, cl) {
    console.log(cl.classify('long SUNW'));
    console.log(cl.classify('short SUNW'));
});

*/
