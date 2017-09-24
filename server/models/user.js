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
    console.log('user:', user);
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) { return next(err); }
            user.password = hash;
            next();
        });
    });
});

// create the model class
const ModelClass = mongoose.model('user', userSchema);

// export model
module.exports = ModelClass;
