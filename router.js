const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false })
module.exports = function (app) {
  app.get('/', requireAuth, (req, res, next) => {
    res.send({ success: true, data: 'Hi There' })
  });

  app.post('/signin', requireSignIn, Authentication.signin)
  app.post('/signup', Authentication.signup);
}
