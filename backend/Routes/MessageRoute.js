const express = require("express");
const Router = express.Router();


//------ Controller -------------

const MessageController = require('../Controllers/MessageController');




Router.route('/api/:id').patch(MessageController.sendMessage);
// Router.route('/:chatId').get(MessageController.allMessages);



module.exports = Router;