var express = require('express');
var router = express.Router();
var sqlclient = require('../utils/sql-client');
var emailclient = require('../utils/email-client');

router.get('/:event_id', function(req, res){
	var event_id = req.params.event_id;
	
	sqlclient.getRsvp4Event(event_id).then(function(rows){
		res.send(rows);
	}).catch (function(err) {
		console.error(err);
		res.send('Error');
	});
});

// Send email function should not fail caller's other functions
// so here we use try n catch block
function sendConfirmationEmail(event_id, email) {
	sqlclient.getEvent(event_id).then(function(rows){
		var event = rows[0];
		emailclient.send(email, event.title, event.id);
	}).catch(function(err){
		console.log(err);
		console.error('Sending confirmation email for event_id: ' + event_id + ', email: ' + email + ' failed.');	
	});
}

router.post('/', function(req, res) {
	var event_id = req.body.event_id;
	var event_date_id = req.body.event_date_id;
	var email = req.body.email;
	var email_enabled = req.body.email_enabled;
	
	sqlclient.setRsvp(event_id, event_date_id, email).then(function(id){
		if (email_enabled && email) {
			sendConfirmationEmail(event_id, email);
		}

		console.log('RSVP with id ' + id + ' is saved for event_id: ' + event_id + ', and event_date_id: ' + event_date_id);
		res.send('Ok');
	}).catch(function(err) {
		console.error('Rsvp got err: ' + err);
		res.send('Error');
	});
});

module.exports = router;