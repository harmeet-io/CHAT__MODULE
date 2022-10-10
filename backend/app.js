const express = require("express");

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));


const mongoose  = require("mongoose");
mongoose.connect('mongodb://localhost:27017/chatDB', {useNewUrlParser : true});


const userRoute = require('./Routes/UserRoute');
const chatRoute = require('./Routes/ChatRoute');
const messageRoute = require('./Routes/MessageRoute');

// ------- Routes -----------------

app.use('/', userRoute);
app.use('/', chatRoute);
app.use('/', messageRoute);



const server = app.listen(8000, () => {
  console.log("Listening on port 8000");
});

const io = require('socket.io')(server, {
  pingTimeout : 60000,
  cors : {
    origin : "http://localhost:3000",
  },
})

io.on("connection", (socket)=>{
  console.log('connected to socket.io');

  socket.on('setup', (userData) => {
    socket.join(userData._id);
    socket.emit('connected');
  })


})


