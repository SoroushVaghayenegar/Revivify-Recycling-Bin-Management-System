var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Revivify' });
});

/*
 * GET bins.
 */
router.get('/getbins', function(req, res) {
    var db = req.db;
    var collection = db.get('binscollection');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/* GET logpage page. */
router.get('/bins', function(req, res) {
    var db = req.db;
    var collection = db.get('binscollection');
    collection.find({},{},function(e,docs){
    	docs.forEach(function(item){
    		if(item.time == null)
    			item.time = "NOT SET";
    		else{
    			var t = new Date(item.time);
    			item.time = t;
    		}
    	})
    	
        res.render('bins', {
        	title: 'Bins',
            "binlist" : docs
        });
    });
});

/* PUT to Update Bin */
router.put('/update-bin', function(req, res){

	// Set our internal DB variable
	var db = req.db;

	//Get our form values from "name attributes"
	var data = req.query.data;
	var time = parseInt(req.query.time);
	var id = parseInt(req.query.id);

	var est = data.substring(0, data.indexOf(','));
    var weight = data.substring(data.indexOf(',')+1 , data.length); 
	//Set our collection
	var collection = db.get('binscollection');

	//update bin
	collection.update( 
		{ _id: id }, 
		{ $set: { 
			"est" : parseInt(est),
			"weight" : parseInt(weight),
			"time" : time} },
		function(err, doc){
			if(err){
				//if failed return err
				res.send("problem adding bin to pickup");
			}
			else{
				res.send("Bin Updated")
			}
			
	});
});


/* GET Pickup Map page. */
router.get('/pickup-map', function(req, res, next) {
  var db = req.db;
  var collection = db.get('binscollection');
  collection.find({},{},function(e,docs){
	res.render('pickup-map', {
    	title: 'Pickup Map',
        "binlist" : docs
    });
  });
});


/* GET Add Bin page. */
router.get('/add-bin', function(req, res, next) {
  res.render('add-bin', { title: 'Add Bin' });
});


/* POST to Add Bin */
router.post('/add-bin', function(req, res){

	// Set our internal DB variable
	var db = req.db;

	//Get our form values from "name attributes"
	var id = parseInt(req.body.id);
	var location = req.body.location;
	var lat = req.body.lat;
	var lng = req.body.lng;

	//Set our collection
	var collection = db.get('binscollection');

	//submit to the DB
	collection.insert({
		"_id" : id,
		"location" : location,
		"weight" : 0,
		"est" : 0,
		"time" : null,
		"last_pickup" : "",
		"on_pickup" : false,
		"lat" : lat,
		"lng" : lng

	}, function(err, doc){
		if(err){
			//if failed return err
			res.send("problem adding bin to database");
		}
		else{
			//forward to list page on success
			res.redirect("add-bin");
			// res.send('message')
		}
	});
});


/* PUT to Add To Pickup */
router.put('/add-to-pickup/', function(req, res){

	// Set our internal DB variable
	
	var db = req.db;
	var id = parseInt(req.body.id);
	// var on_pickup = req.body.on_pickup
	
	//Set our collection
	var collection = db.get('binscollection');

	collection.update( 
		{ _id: id }, 
		{ $set: { "on_pickup": true } },
		function(err, doc){
			if(err){
				//if failed return err
				res.send("problem adding bin to pickup");
			}
			
	});

});

/* PUT to Remove Pickup */
router.put('/remove-pickup/', function(req, res){

	// Set our internal DB variable
	var db = req.db;
	var id = parseInt(req.body.id);
	// var on_pickup = req.body.on_pickup
	
	//Set our collection
	var collection = db.get('binscollection');

	collection.update( 
		{ _id: id }, 
		{ $set: { "on_pickup": false } },
		function(err, doc){
			if(err){
				//if failed return err
				res.send("problem adding bin to pickup");
			}
			
	});

});

module.exports = router;
