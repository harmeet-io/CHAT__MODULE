const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    isAdmin : {
      type : Boolean,
      default : false,
    }
  },

  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("User", UserSchema);
