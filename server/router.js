const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {

    // protected routes
    app.get('/', requireAuth, function(req, res, next) {
        res.send({ "hi": "there" });
    });

    // signup and signin
    app.post('/signup', Authentication.signup);
    app.post('/signin', requireSignin, Authentication.signin);

}
