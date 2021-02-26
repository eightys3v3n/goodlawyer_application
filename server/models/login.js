const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        require: [true, 'A username is required']
    },
    password_hash: {
        type: String,
        require: [true, 'A password is required']
    }
})

const User = mongoose.model('Login', UserSchema);
