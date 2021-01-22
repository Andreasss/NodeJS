
//Libraries to do the different stuff
const fs = require("fs");
const http = require("http");
const url = require("url");
//Installed in git using npm install moment --save
//Downloaded from the website of the library moment.js
const moment = require("moment");

var returnJSON = function(data, response) {
  response.writeHead(200, {
    "Content-Type": "application/json"
  });
  response.end(JSON.stringify(data));
}

var returnHTML = function(filename, response){
  fs.readFile(filename, function(error, data){
    if(error){
      response.writeHead(404);
      resposne.end();
    }
    response.writeHead(200, {
      "Content-Type": "text/html"
    });
    response.end(data);
  });
}

//Creating a server and a url and checking whether a certain thing matches with the path.
var server = http.createServer(function(request, response) {
  console.log(request.url);
  var u = url.parse(request.url, true);

  if (u.pathname === "/") {
    returnHTML("index.html", response);
  }
  else if (u.pathname === "/dog") {
    returnJSON("DOGGO", response);
  }
  else if (u.pathname === "/dogx") {
    //Print in the page the query of the path (after the "?")
    var name = u.query.name;
    console.log(name);
      var returnData = {
        "response": "doggox " + name
      }
      returnJSON(returnData, response);
  }
  else if (u.pathname === "/time") {
    var now = new moment().utc();
    returnJSON(now, response);
  }
  else {
    response.end();
  }
});

server.listen(3000, "127.0.0.1", function() {
  console.log("Server started");
});
