const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, 'A username is required']
    },
    password: {
        type: String,
        require: [true, 'A password is required']
    }
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('user', UserSchema);
