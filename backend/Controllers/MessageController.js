const Messages = require("../Models/MessageModel");
const Users = require("../Models/UserModel");

const sendMessage = async (req, res) => {
  try {
    const chat = await Messages.findOne({ user_id: req.params.id });
    // console.log(req.params.id);
    // console.log(chat, "Caht");
    // console.log(req.body);

    if (req.body.isAdmin == 0) {
      const temp = {
        isAdmin: 0,
        content: req.body.content,
      };
      // console.log(chat.messages, 'we are getting');
      chat.messages.push(temp);
      await chat.save();
    } else {
      const temp = {
        isAdmin: 1,
        content: req.body.content,
      };
      chat.messages.push(temp);
      await chat.save();
    }

    // console.log(chat.messages, "chattt");

    res.status(200).json({
      status: "Sucess",
      Message: "Message sent successfully",
      newChat: chat,
    });
  } catch (error) {
    console.log(error, 'error');
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


const getUserChat = async(req, res) => {
  try {
    let count;
    console.log(req.params.id, 'e');


    const chat = await Messages.findOne({user_id : req.params.id});
    console.log(chat, 'chat');

    res.status(200).json({
      Status : 'Sucess',
      Message : 'Chat fetched successfully',
      Chat : chat
    })
    
    // (chat.messages).forEach(message => {
    //   if(isActive == 0){
    //     count ++;
    //   }
    // });





  } catch (error) {
        res.status(500).json({
          Status: "Error",
          Message: "Internal Server Error",
          Error: error,
        });
    
  }
}

module.exports = {
  sendMessage,
  endChat,
  getUserChat,
};
