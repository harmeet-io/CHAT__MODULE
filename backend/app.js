const express = require("express");
const app = express();
import { Server } from "socket.io";
app.use(express.json());

import http from "http";
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: "*" } });



// const cors = require('cors');
// app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

app.use(express.json());


const mongoose  = require("mongoose");
mongoose.connect('mongodb://localhost:27017/chatDB', {useNewUrlParser : true});


const userRoute = require('./Routes/UserRoute');
const messageRoute = require('./Routes/MessageRoute');


// ------- Routes -----------------

app.use('/', userRoute);
app.use('/', messageRoute);



io.on("connect", (socket) => {
  console.log("New User : " + socket.id);

  socket.on("joinedAdmin", () => {
    io.join(socket.id);
  });
  socket.on("sendMessage", (message) => {
    io.
  });

  socket.on("findStranger", (mode) => {
    const user = getUser(socket.id);
    const index = users.indexOf(user);

    if (user) {
      users[index].activeStatus = true;
      users[index].mode = mode;
    }

    const foundUser = findStranger(socket.id, mode);
    const foundIndex = users.indexOf(foundUser);

    if (user && foundUser) {
      socket.emit("foundStranger", foundUser.id);
      socket.emit("videoConnect", foundUser.id);
      io.to(foundUser.id).emit("foundStranger", socket.id);
      users[index].activeStatus = false;
      users[foundIndex].activeStatus = false;
    }
  });

  socket.on("sendMessage", ({ message, friendId }) => {
    message["sent"] = false;
    io.to(friendId).emit("sentMessage", message);
  });

  socket.on("videoConnect", ({ friendId, signal }) => {
    io.to(friendId).emit("videoConnected", { friendId: socket.id, signal });
  });

  socket.on("videoConnectionSuccess", ({ friendId, signal }) => {
    io.to(friendId).emit("videoConnectionSuccess", signal);
  });

  socket.on("isTyping", (friendId) => {
    io.to(friendId).emit("isTyping");
  });

  socket.on("end", (friendId) => {
    io.to(friendId).emit("end");
  });

  socket.on("getTotalActiveUsers", () => {
    socket.emit("totalActiveUsers", users.length);
  });

  socket.on("disconnect", () => {
    deleteUser(socket.id);
  });
});


server.listen(8000, () => {
  console.log("Listening on port 8000");
});



