const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

// define our model
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: {
        type: String
    }
});

// on save hook, encrypt password
userSchema.pre('save', function(next) {
    const user = this;
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) { return next(err); }
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        // if error, return early
        if (err) { return callback(err); }
        // otherwise, return isMatch value
        callback(null, isMatch);
    });
};

// create the model class
const ModelClass = mongoose.model('user', userSchema);

// export model
module.exports = ModelClass;
