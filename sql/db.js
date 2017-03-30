var express = require('express');
var mysql = require('mysql')

var db = {};
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '1n0Root',
	database : 'expmit'
});

connection.connect();

db.get = function(sql, onSuc) {	
	connection.query(sql, function (err, rows, fields) {
  		if (err) {
	  		throw err;
	  	}

	  	onSuc(rows);
	});
};

// Insert a new rsvp and return the newly inserted row id
db.set = function(sql, onSuc, onErr) {
	connection.query(sql, function (err, results, fields) {
		if (err) {
	  		throw err;
	  	}

	  	onSuc(results.insertId);
	});
};



module.exports = db;