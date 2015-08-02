var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var facebook = require('./Modules/facebook.js');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 8000;

var router = express.Router();

// viewed at http://localhost:8080
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/Views/index.html'));
});

router.route('/friends')
    .post(function(req,res){
       var accessToken = req.body.accessToken;
       facebook.getFbData(accessToken, '/me/friends',function(data){
           res.send(data);
       });
    });

app.use('', router);

//Start the Server
app.listen(port);
console.log("Magic happens at port " + port);