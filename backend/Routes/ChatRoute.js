const express = require("express");
const Router = express.Router();


// --------- Controller ------------------
const ChatController = require('../Controllers/ChatController');


// ------ APIs ------------------------

Router.route('/api/access-chat/:id').post(ChatController.accessChat);
// Router.route("/api/fetch-chat").get(ChatController.fetchChat);



module.exports = Router;