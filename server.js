var natural = require('natural');
var express = require('express');
var app = express();
//var app = require('express')();
var bodyParser = require('body-parser');


var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var cl = new natural.BayesClassifier();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:8080");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.post('/query', jsonParser, function(req, res) {
	if (!req.body) return res.sendStatus(400);
	/*
	natural.BayesClassifier.load('cl.json', null, function(err, classifier) {
		res.json({'answer': classifier.classify(req.body.q)});
	});*/
	console.log(req.body);
	console.log(req.body.q);
	//
	res.json({'answer': cl.classify(req.body.q) });
})



app.post('/save', jsonParser, function(req, res) {
	if (!req.body) return res.sendStatus(400);

	cl.addDocument(req.body.s, req.body.a);
	cl.train();

	/*
	natural.BayesClassifier.load('cl.json', null, function(err, classifier) {
		classifier.addDocument(req.body.s, req.body.a);
		classifier.train();
		classifier.save('cl.json', function(err, cl) {});
		cl = classifier;
	});*/

	cl.save('cl.json', function(err, cl) {
	    // the cl is saved to the cl.json file!
	});

	res.json({ 'test': false });
})

app.use('/', express.static('.'));

app.listen(8080);




cl.events.on('trainedWithDocument', function (obj) {
	console.log("\n");
	console.log(obj);
	console.log("\n");
	/* {
	*   total: 23 // There are 23 total documents being trained against
	*   index: 12 // The index/number of the document that's just been trained against
	*   doc: {...} // The document that has just been indexed
	*  }
	*/
});
