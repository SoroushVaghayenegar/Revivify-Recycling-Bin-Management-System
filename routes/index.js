var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });


});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});


/* GET Userlist page. */
router.get('/datalist', function(req, res) {
    var db = req.db;
    var collection = db.get('datacollection');
    collection.find({},{},function(e,docs){
        res.render('datalist', {
        	title: 'LIST',
            "datalist" : docs
        });
    });
});

/* POST to Add data Service */
router.post('/adddata', function(req, res){

	// Set our internal DB variable
	var db = req.db;

	//Get our form values from "name attributes"
	var weight = req.query.weight;
	var time = req.query.time;

	//Set our collection
	var collection = db.get('datacollection');

	//submit to the DB
	collection.insert({
		"weight" : weight,
		"time" : time
	}, function(err, doc){
		if(err){
			//if failed return err
			res.send("problem adding data to database");
		}
		else{
			//forward to list page on success
			res.redirect("datalist");
		}
	});
});

module.exports = router;
