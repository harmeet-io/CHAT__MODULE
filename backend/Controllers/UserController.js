const USER = require("../Models/UserModel");


//--------- Add user ---------------------

const addUser = async (req, res) => {
  try {
    const user = new USER({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    });

    

    const newUser = await user.save();

    res.status(201).json({
      Status: "Success",
      Message: "New user has been added",
      User: newUser,
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

module.exports = {
  addUser,
  removeUser,
};
