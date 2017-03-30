var express = require('express');
var sqlclient = require('../sql/sqlclient');
var router = express.Router();

/* GET home page. */
router.get('/all', function(req, res) {
	sqlclient.getAllEvents().then(function(rows){
		res.send(rows);
	}).catch (function(err) {
		console.error(err);
		res.send('Error');
	});
});

router.get('/rsvp/:event_id', function(req, res){
	var event_id = req.params.event_id;
	
	sqlclient.getRsvp4Event(event_id).then(function(rows){
		res.send(rows);
	}).catch (function(err) {
		console.error(err);
		res.send('Error');
	});
});

router.post('/rsvp', function(req, res) {
	var event_id = req.body.event_id;
	var email = req.body.email;
	
	sqlclient.setRsvp(event_id, email).then(function(id){
		console.log('Rsvp with id ' + id + ' is inserted.');
		res.send('Ok');
	}).catch(function(err) {
		console.error('Rsvp got err: ' + err);
		res.send('Error');
	});
});

module.exports = router;