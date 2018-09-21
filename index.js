//Using express library to make a server instead of the http.
//Express library was installed => npm install express --save
//A new package with JSON project was created => npm init
//The express was added in the dependencies of that package automatically when was downloaded.
const express = require("express");
const path = require("path");
const moment = require("moment");

//Declare the required router
var home = require("./routes/home");

var server = express();

//Using the pug template which installed via npm install pug
//It provides to user to write html in a different format which after the execution becomes normal html
//Setting the pug to be used from the server which is in the folder views
//The "/" indicates the path that going to be execute the specific functionality
//So the 127.0.0.1:3000 does the stuff in the index.pug file and the 127.0.0.1:3000/xxx the stuff in the great file
//The stuff below can also be passed in the routes and be router.set("views"....)...
//The code below says that all my views are in the views folder and the views are witten in pug language.
server.set("views", path.join(__dirname, "views"));
server.set("view engine", "pug");
server.get("/", function(request, response){
  response.render("index");
});

//When in the url xwx there is no query name i.e ?name=andreas => the "myName" variable is passing in the file great
//via the variable "name". The "name" variable is also called in the great file.
//In the pugs files i can also create a layout file that will do all the functionality for all the other pugs
//and in the other files just extend the layout file and the block content
//This function could be go through an API and do lot of stuff. I can pass anything inside the function.
//If i request and collect an API with lots of data like the Spotify, i then send them all to the client. With the NodeJS and get the API from the server i can strip out the data that won't be sent to the client
server.get("/xwx", function(request, response){
  var myName = request.query.name;
  if (myName === undefined){
    myName = "KSOPISO EMEIS KAI MIN SE MELEI!";
  }
  response.render("great", {
    name: myName,
  });
});

//Serving static files like, hmtl files, css, images etc. Declaring an individual address for static files
//If the server gets request is then going to look in that folder and execute the codes.
server.use(express.static(path.join(__dirname, "static")));

//Tell the server to use that particular router
server.use("/", home);

server.listen(3000);

module.exports = server;
