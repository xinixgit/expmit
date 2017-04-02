var express = require('express');
var router = express.Router();
var sqlclient = require('../utils/sql-client');

router.get('/all', function(req, res) {
	sqlclient.getAllEvents().then(function(data){
		res.send(data);
	}).catch (function(err) {
		console.error(err);
		res.send('Error');
	});
});

module.exports = router;