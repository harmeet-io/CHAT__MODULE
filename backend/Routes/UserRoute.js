const express = require('express');
const Router = express.Router();



// --------- Controllers -------------------

const UserController = require('../Controllers/UserController');



// ----------- APIs ------------------------

Router.route('/api/add-user').post(UserController.addUser);
Router.route('/api/remove-user/:id').delete(UserController.removeUser);


module.exports = Router;