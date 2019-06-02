var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Number
    }
});

UserSchema.methods.encryptPassword = function(password) {
    // console.log('===========' + bcrypt.hash(password, bcrypt.genSalt(5), null ));
    return bcrypt.hash(password, bcrypt.genSalt(5), null );
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var User = module.exports = mongoose.model('User', UserSchema);