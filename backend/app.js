const express = require("express");

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

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



const server = app.listen(8000, () => {
  console.log("Listening on port 8000");
});



