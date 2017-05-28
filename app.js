var express = require("express");
var couchbase = require("couchbase");
var bodyParser = require("body-parser");
var ottoman = require("ottoman");
var cors = require("cors");
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
//TODO - Set whitelist for cors when app is to be launched.


var cluster = new couchbase.Cluster("http://158.37.225.246:8091");

var bucket = cluster.openBucket("example");
module.exports.bucket = bucket;

var routes = require("./routes")(app);

//ottoman.bucket = bucket;
ottoman.store = new ottoman.CbStoreAdapter(bucket, couchbase);
ottoman.ensureIndices(function(error){
    if(error){
        console.log(error);
    }
    var server = app.listen(3000, function(){
        console.log("listening on port: " + server.address().port);
    });
});
