//user model file...
const mongoose = require("mongoose");

//define the schema of the user...
const UserModel = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: 1
    },
    created_on: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('users', UserModel);
