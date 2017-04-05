var mysql = require('mysql')
var db = require('./db');

var sqlClient = {};

var SELECT_EVENT_BY_ID = 'SELECT * FROM event WHERE id = ?;';
var SELECT_AVL_DATES = 'SELECT * FROM event_date WHERE time_start >= CURDATE() ORDER BY event_id ASC;';
var SELECT_EVENTS = 'SELECT ins.*, e.* FROM instructor ins, event e WHERE ins.id = e.instructor_id AND e.id IN (?);';
var SELECT_ALL_RSVP_4_EVENT = "SELECT r.* FROM rsvp r WHERE r.event_id = ?";
var SELECT_EVENT_RSVP = "SELECT count(*) as count FROM rsvp WHERE event_id = ? AND event_date_id = ? AND email = ?;";
var INSERT_RSVP = "INSERT INTO rsvp (event_id, event_date_id, email) VALUES (?,?,?);"

sqlClient.getEvent = function(event_id) {
	return db.get(mysql.format(SELECT_EVENT_BY_ID, [event_id]));
};

sqlClient.getAllEvents = function() {		
	var map = {};
	return db.get(SELECT_AVL_DATES).then(function(rows){
		if (!rows || rows.length == 0) {
			console.error('No available events found.');
			// Call resolve with an empty array ([])
			return new Promise((resolve) => resolve([]));
		}

		for (var i = 0; i < rows.length; i++) {
			var row = rows[i];
			if (!map[row.event_id]) {
				map[row.event_id] = [];
			}
			map[row.event_id].push(row);
		};

		// With all event ids extracted from all available dates, we need
		// to extract the actual events at this point
		var sql = mysql.format(SELECT_EVENTS, [Object.keys(map)]);
		return db.get(sql);
	}).then(function(rows){
		for (var i = 0; i < rows.length; i++) {
			var row = rows[i];
			row['dates'] = map[row.id];
		};

		return rows;
	});
};

sqlClient.getRsvp4Event = function(event_id) {
	var sql = mysql.format(SELECT_ALL_RSVP_4_EVENT, [event_id]);
	return db.get(sql);
}

// Insert a new rsvp and return the newly inserted row id
sqlClient.setRsvp = function(event_id, event_date_id, email) {
	return db.get(mysql.format(SELECT_EVENT_RSVP, [event_id, event_date_id, email]))
	.then(function(rows) {
		var count = rows[0].count;
		if(count) {
			return Promise.reject('Rsvp already exists');
		}

		var sql = mysql.format(INSERT_RSVP, [event_id, event_date_id, email]);
		return db.set(sql); 
	});
};

module.exports = sqlClient;