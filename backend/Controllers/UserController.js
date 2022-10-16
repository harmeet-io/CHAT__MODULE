const USER = require("../Models/UserModel");
const Ids = require("../Models/IdModel");
const Messages = require("../Models/MessageModel");

//--------- Add user ---------------------

const addUser = async (req, res) => {
  try {
    const email = await Ids.findOne({ email: req.body.email });

    if (!email) {
      const user = new USER({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      });

      const newUser = await user.save();

      const id = new Ids({
        user_id: newUser._id,
        email: req.body.email,
      });

      await id.save();

      const data = {
        isAdmin: 1,
        content: "Hi " + newUser.name + "! " + "How may I help you? ",
      };

      const newChat = await Messages({
        user_id: newUser._id,
        messages: data,
      });
      console.log(newChat, "new CHat");
      newChat.save();

      return res.status(201).json({
        Status: "Success",
        Message: "New user has been added",
        User: newUser,
      });
    }

    const existing_user = await USER.findOne({ email: req.body.email });

    const chat = await Messages.findOne({ user_id: existing_user._id });
    const temp = {
      isAdmin: 1,
      content: "Hi " + existing_user.name + "! " + "How may I help you? ",
    };

    chat.messages.push(temp);

    chat.save();

    res.status(201).json({
      Status: "success",
      Message: "User already exists",
      User: existing_user,
    });
  } catch (error) {
    res.status(500).json({
      Status: "Error",
      Message: "Internal Server Error",
      Error: error,
    });
  }
};

//----------Remove user -------------------

const removeUser = async (req, res) => {
  try {
    const user = await USER.findOne({ _id: req.params.id });

    if (!user) {
      res.status(404).json({
        Status: "Error",
        Message: "User not found",
      });
    }

    await user.remove();

    res.status(200).json({
      Status: "Success",
      Message: "User has been removed",
    });
  } catch (error) {
    console.log(error, "error");

    res.status(500).json({
      Status: "Error",
      Message: "Internal Server Error",
      Error: "Error",
    });
  }
};

const getUsers = async (req, res) => {
  try {

    const users =await USER.find();
    console.log(users, 'nie');

    if(!users){
      console.log('No user found');
    }

    return res.status(200).json({
      Status : 'Success',
      Message : 'Users fetched successfully',
      Users : users
    });


  } catch (error) {
    console.log(error, "error");

    res.status(500).json({
      Status: "Error",
      Message: "Internal Server Error",
      Error: "Error",
    });
  }
};

module.exports = {
  addUser,
  removeUser,
  getUsers,
};
