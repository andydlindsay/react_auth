const passport = require('passport');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// set up options for jwt strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.SECRET_KEY
};

// create jwt strategy
// payload is decoded jwt token
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    
    // see if the user id in the payload exists in our database
    User.findById(payload.sub, function(err, user) {
        // return if error
        if (err) { return done(err, false); }
        
        if (user) {
            // if it does, call done with that user object
            done(null, user);
        } else {
            // else, call done without a user object
            done(null, false);
        }

    });

});

// tell passport to use this strategy
passport.user(jwtLogin);
