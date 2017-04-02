var express = require('express');
var router = express.Router();
var sqlclient = require('../utils/sql-client');

router.get('/:event_id', function(req, res){
	var event_id = req.params.event_id;
	
	sqlclient.getRsvp4Event(event_id).then(function(rows){
		res.send(rows);
	}).catch (function(err) {
		console.error(err);
		res.send('Error');
	});
});

function sendConfirmationEmail(event_id, email) {
	try {

	} catch (err) {
		console.error('Sending confirmation email for event_id: ' + event_id + ', email: ' + email + ' failed.');
	}
}

router.post('/', function(req, res) {
	var event_id = req.body.event_id;
	var event_date_id = req.body.event_date_id;
	var email = req.body.email;
	
	sqlclient.setRsvp(event_id, event_date_id, email).then(function(id){
		sendConfirmationEmail(event_id, email);

		console.log('Rsvp with id ' + id + ' is inserted.');
		res.send('Ok');
	}).catch(function(err) {
		console.error('Rsvp got err: ' + err);
		res.send('Error');
	});
});

module.exports = router;