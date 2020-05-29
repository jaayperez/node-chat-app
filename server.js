// require the express module
const express = require("express");
const app = express();

// require the http module
const http = require("http").Server(app);

// require the socket.io module
const io = require("socket.io");

const port = 5000;

// set the express.static middleware
app.use(express.static(__dirname + "/public"));

// integrating socketio
socket = io(http);

// setup event listener
socket.on("connection", socket => {
  console.log("user connected");

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  socket.on("chat message", function(msg) {
    console.log("message: "  +  msg);

    // broadcast message to everyone in port:5000 except yourself
    socket.broadcast.emit("received", { message: msg });
  });
});

http.listen(port, () => {
  console.log("Running on Port: " + port);
});
