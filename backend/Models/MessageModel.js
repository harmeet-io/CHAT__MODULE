const Mongoose = require('mongoose');

const MessageSchema = new Mongoose.Schema({ 

  user_id : {
    type : String,
    required : false
  },

  messages : [
    {
      isAdmin : {
        type : Boolean, 
      },
      content : {
        type : String,
        required : false,
      },
      time : {
        type : String, 
        required : false,
      },
      date : {
        type : String,
        required : false,
      },
      isActive : {
        type : Boolean,
        default : 1
      }
    }
  ]
})

module.exports = new Mongoose.model('Message', MessageSchema);