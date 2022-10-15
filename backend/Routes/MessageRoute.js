const express = require("express");
const Router = express.Router();


//------ Controller -------------

const MessageController = require('../Controllers/MessageController');



Router.route('/api/send-message/:id').post(MessageController.sendMessage);
Router.route('/api/end-chat/:id').post(MessageController.endChat);

Router.route('/api/get-user-chat/:id').get(MessageController.getUserChat);



module.exports = Router;