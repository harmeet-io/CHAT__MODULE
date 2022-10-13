const mongoose = require('mongoose');

const IdSchema = new mongoose.Schema({
    user_id : {
        type : String,
    },
    email : {
        type : String,
    }
})

module.exports = new mongoose.model('Id', IdSchema);