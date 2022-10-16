const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
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
