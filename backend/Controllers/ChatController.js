const CHAT = require("../Models/ChatModel");

const accessChat = async (req, res) => {
  try {
    const user_id = req.params.id;

    var isChat = await CHAT.find({
      user_id: req.params.id,
    });

    if (isChat.length > 0) {
      console.log("YES FOUND");
      return res.status(200).json({
        Status : 'Success',
        Message : 'Chat found',
        Chat : isChat[0]
      })
    } else {
      var chatData = {
        user_id: req.params.id,
      };
    }

    const createdChat = await CHAT.create(chatData);
    const FullChat = await CHAT.findOne({ _id: createdChat._id });

    res.status(200).send(FullChat);
  } catch (error) {
    res.status(500).json({
      Status: "Error",
      Message: "Internal server error",
    });
  }
};

module.exports = {
  accessChat,
};
