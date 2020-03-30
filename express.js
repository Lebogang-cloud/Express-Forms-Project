const pg = require("pg");
const http = require("http");
const express = require("express");
const visitor = express();

visitor.use(express.urlencoded({ extended: false }));


function addNewVisitor() {
//   visitor.use(express.static("public"));
  visitor.get("/index.html", function(res, req) {
    res.sendfile(__dirname + "index.html");
  });
}

visitor.post("/submit", function(res, req) {
    if(req.body != "")
  res.send("Thanks for the info!");
});

var server = visitor.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })
