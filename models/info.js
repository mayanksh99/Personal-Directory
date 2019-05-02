const mongoose = require('mongoose');

const InfoSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    mob_number:{
        type: Number
    },
    dob:{
        type: String
    },
    anniORbday:{
        type: String
    }
});

module.exports = Info = mongoose.model('info', InfoSchema);