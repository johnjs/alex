var config = require('../../config/config');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(Users, passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.username);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  passport.use('local-login', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, username, password, done) {
      Users.findOne({
        username: username
      }).then(function(user) {
        if (!user) {
          return done(null, false, req.flash('loginMessage', 'No user found.'));
        }
        user.comparePassword(password).then(function(doesMatch) {
          if (doesMatch) {
            done(null, user);
          } else {
            done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
          }
        }, function(err) {
          done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
        });
      }, function(err) {
        done(err);
      });
    }));

  passport.use(new FacebookStrategy({
      clientID: config.oauth.FACEBOOK_APP_ID,
      clientSecret: config.oauth.FACEBOOK_APP_SECRET,
      callbackURL: config.oauth.CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
      done(null, {
        username: profile._json.id,
        source: 'facebook'
      });
    }
  ));
};
