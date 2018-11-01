var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require("request");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('index.html', { root: 'public' });
});

router.get('/joke', function(req, res, next) {
    var url = "https://08ad1pao69.execute-api.us-east-1.amazonaws.com"
    url += "/dev/random_joke"; 
    console.log(url);
    request(url).pipe(res);
   
});

module.exports = router;
