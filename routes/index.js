var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require("request");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('weather.html', { root: 'public' });
});

router.get('/getcity', function(req, res, next) {

    fs.readFile(__dirname + '/cities.dat.txt', function(err, data) {
        if (err) throw err;
        var cities = data.toString().split("\n");
        for (var i = 0; i < cities.length; i++) {
            var result = cities[i].search(myRe);
            if (result != -1) {
                console.log(cities[i]);
            }
        }

        var jsonresult = [];
        for (var i = 0; i < cities.length; i++) {
            var result = cities[i].search(myRe);
            if (result != -1) {
                console.log(cities[i]);
                jsonresult.push({ city: cities[i] });
            }
        }
        console.log(jsonresult);
        res.status(200).json(jsonresult);
    });

    var myRe = new RegExp("^" + req.query.q);

});

router.get('/dictionary', function(req, res, next) {
    var url = "https://owlbot.info/api/v1/dictionary/"
    url += req.query['q'];
    url += "?format=json";
    console.log(url);
    request(url).pipe(res);
});

module.exports = router;
