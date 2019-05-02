const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

module.exports = Info = mongoose.model('users', UsersSchema);