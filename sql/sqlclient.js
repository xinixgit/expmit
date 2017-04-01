var mysql = require('mysql')
var db = require('./db');

var sqlClient = {};

var SELECT_ALL_EVENTS = "SELECT ins.*, e.* FROM instructor ins, events e WHERE ins.id = e.instructor_id AND e.time_start >= CURDATE() ORDER BY e.id ASC;";  
var SELECT_ALL_RSVP_4_EVENT = "SELECT r.* FROM rsvp r WHERE r.event_id = ?;";
var SELECT_EVENT_RSVP = "SELECT count(*) as count FROM rsvp WHERE event_id = ? AND email = ?;";
var INSERT_RSVP = "INSERT INTO rsvp (event_id, email) VALUES (?,?);"

sqlClient.getAllEvents = function() {	
	return db.get(SELECT_ALL_EVENTS);
};

sqlClient.getRsvp4Event = function(event_id) {
	sql = mysql.format(SELECT_ALL_RSVP_4_EVENT, [event_id]);
	return db.get(sql);
}

// Insert a new rsvp and return the newly inserted row id
sqlClient.setRsvp = function(event_id, email) {
	return db.get(mysql.format(SELECT_EVENT_RSVP, [event_id, email]))
	.then(function(rows) {
		var count = rows[0].count;
		if(count) {
			return Promise.reject('Rsvp already exists');
		}

		sql = mysql.format(INSERT_RSVP, [event_id, email]);
		return db.set(sql); 
	});
};

module.exports = sqlClient;