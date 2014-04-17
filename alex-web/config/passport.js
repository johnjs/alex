var LocalStrategy = require('passport-local').Strategy;

module.exports = function (Users, passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.username);
    });

    passport.deserializeUser(function (username, done) {
        Users.findOne({username: username}).then(function (user) {
            done(null, user);
        }, function (err) {
            done(err);
        });
    });

    passport.use('local-login', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, username, password, done) {
            Users.findOne({username: username}).then(function (user) {
                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                }
                user.comparePassword(password).then(function (doesMatch) {
                    if (doesMatch) {
                        done(null, user);
                    } else {
                        done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                    }
                }, function (err) {
                    done(err);
                });
            }, function (err) {
                done(err);
            });
        }));

}



