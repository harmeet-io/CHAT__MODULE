const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DB Connection
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/chatDB", { useNewUrlParser: true })
  .then((res) => console.log("DB Connected!"))
  .catch((err) => console.log(err));

const userRoute = require("./Routes/UserRoute");
const messageRoute = require("./Routes/MessageRoute");

// ------- Routes -----------------

app.use("/", userRoute);
app.use("/", messageRoute);

// ------- Socket -----------------
const users = [];

io.on("connect", (socket) => {
  socket.on("joinedUser", ({ userId }) => {
    users.push({ userId, socketId: socket.id });
  });
  socket.on("joinedAdmin", () => {
    socket.join("admins");
  });
  socket.on("sendMessage", ({ userId, message }) => {
    io.to("admins").emit("sentMessage", { userId, message });
  });
  socket.on("sentMessage", ({ userId, message }) => {
    io.to(users.find(user => user.userId === userId).socketId).emit("sendMessage", { message });
  });
  socket.on("disconnect", () => {
    users.filter((user) => user.socketId != socket.id);
    socket.leave("admins");
  });
});

server.listen(8000, () => {
  console.log("Listening on port 8000");
});
