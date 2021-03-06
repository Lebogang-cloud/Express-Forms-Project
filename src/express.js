const express = require('express');
const path = require("path");

const app = express();
const {addNewVisitor, createTable} = require("./db");

app.use(express.urlencoded({extended: true}));



app.set('view engine', 'pug')
app.get('/', function (req, res) {
   res.render('index')
 })

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname + "/index.html" ));
});

app.post('/', async (req, res)=> {

  let visitorname=req.body.vname;
  let assistedby=req.body.aname;
  let age=req.body.age;
  let date=req.body.date;
  let time=req.body.time;
  let comments=req.body.comments;

  // Returning visitor
  createTable();
   const visitor =await addNewVisitor(visitorname,assistedby,age,date,time,comments);
  
     res.render("index", {
       visitorId: visitor[0].id,
       visitorname:req.body.vname,
       assistedby:req.body.aname,
       age:req.body.age,
       date:req.body.date,
       time:req.body.time,
       comments:req.body.comments
      });
})

const server = app.listen(8080, function () {
   const host = server.address().address
   const port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

module.exports = server;