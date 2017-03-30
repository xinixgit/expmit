var express = require('express');
var mysql = require('mysql')
var db = require('./db');

var sqlClient = {};

var SELECT_ALL_EVENTS = "SELECT ins.*, e.* FROM instructor ins, events e WHERE ins.id = e.instructor_id ORDER BY e.id ASC;";  
var SELECT_RSVP_4_EVENT = "SELECT r.* FROM rsvp r WHERE r.event_id = ?;";
var INSERT_RSVP = "INSERT INTO rsvp (event_id, email) VALUES (?,?);"

sqlClient.getAllEvents = function(onSuc) {	
	db.get(SELECT_ALL_EVENTS, onSuc);
};

sqlClient.getRsvp4Event = function(event_id, onSuc) {
	sql = mysql.format(SELECT_RSVP_4_EVENT, [event_id]);
	db.get(sql, onSuc);
}

// Insert a new rsvp and return the newly inserted row id
sqlClient.setRsvp = function(event_id, email, onSuc) {
	sql = mysql.format(INSERT_RSVP, [event_id, email]);
	db.set(sql, onSuc);
};

module.exports = sqlClient;