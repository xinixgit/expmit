var express = require('express');
var db = require('db');
var sqlClient = {};

var SELECT_ALL_EVENTS = "SELECT ins.*, e.* FROM instructor ins, events e WHERE ins.id = e.instructor_id ORDER BY e.id ASC;";  
var INSERT_RSVP = "INSERT INTO rsvp (event_id, email) VALUES (?,?);"

sqlClient.getAllEvents = function(onSuc, onErr) {	
	db.get(SELECT_ALL_EVENTS, onSuc, onErr);
};

// Insert a new rsvp and return the newly inserted row id
sqlClient.setRsvp = function(event_id, email, onSuc, onErr) {
	sql = mysql.format(INSERT_RSVP, [event_id, email]);
	db.set(sql, onSuc, onErr);
};

module.exports = sqlClient;