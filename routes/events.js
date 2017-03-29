var express = require('express');
var sqlclient = require('../sql/sqlclient');
var router = express.Router();

/* GET home page. */
router.get('/all', function(req, res) {
	sqlclient.getAllEvents(function(rows){
		res.send(rows);
	});
});

router.post('/rsvp', function(req, res) {
	var event_id = req.body.event_id;
	var email = req.body.email;
	sqlclient.setRsvp(event_id, email, function(id){
		console.log('Insert rsvp with id ' + id ' successful');
	}, function(err) {
		console.err(err);
		console.log('Insert rsvp with id ' + id ' failed');
	});	

	res.send('OK');
});

module.exports = router;