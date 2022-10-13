const Messages = require("../Models/MessageModel");
const Users = require("../Models/UserModel");

const sendMessage = async (req, res) => {
  try {
    const chat = await Messages.findOne({ user_id: req.params.id });

    if (req.body.isAdmin == 0) {
      const temp = {
        isAdmin: 0,
        content: req.body.content,
      };

      chat.messages.push(temp);
    } else {
      const temp = {
        isAdmin: 1,
        content: req.body.content,
      };
      chat.messages.push(temp);
    }

    await chat.save();
    console.log(chat.message, "chattt");

    res.status(200).json({
      status: "Sucess",
      Message: "Message sent successfully",
      newChat: chat,
    });
  } catch (error) {
    res.status(500).json({
      Status: "Error",
      Message: "Internal Server Error",
      Error: error,
    });
  }
};

const endChat = async (req, res) => {
  try {

    const chat = await Messages.findOne({user_id : req.params.id});

    
    const temp = {
        content : 'Chat Ended',
        isActive : false,
    }

    chat.messages.push(temp);

    await chat.save();

    res.status(200).json({
        Status : 'Success',
        Message : 'Chat Ended !',
        UpdatedChat : chat
    })


  } catch (error) {
    res.status(500).json({
      Status: "Error",
      Message: "Internal Server Error",
      Error: error,
    });
  }
};

module.exports = {
  sendMessage,
  endChat,
};
