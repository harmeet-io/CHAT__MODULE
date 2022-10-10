const Messages = require('../Models/MessageModel');
const USER = require('../Models/UserModel');


const sendMessage = async() => {
    try {

        const user = await Messages.findOne({user_id : req.params.id});

        if(!user){
            return res.status(404).json({
                Status : 'Error',
                Message : 'No existing chat found'
            })
        }

        



         

        
    } catch (error) {
        
    }
}



module.exports = {
    sendMessage
}