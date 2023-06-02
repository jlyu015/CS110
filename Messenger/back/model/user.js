const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    displayName: {
        type: String,
        required: true,
    },
    rooms: {
        type: Array,
        required: true,
    }

    },
    {
        collection: 'UserData', // Specify the custom collection name
    }
)

module.exports = mongoose.model('User', userSchema)