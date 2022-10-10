const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
    },

    user_message: [
      {
        message: {
          type: String,
        },
        time: {
          type: String,
        },
      },
    ],

    admin_message: [
      {
        message: {
          type: String,
        },
        time: {
          type: String,
        },
      },
    ],
  },

  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("Message", MessageSchema);
