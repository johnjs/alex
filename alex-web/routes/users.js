var logger = require('../app/utils/Logger');
var Response = require('../app/utils/Response');

module.exports = function (Users, passport) {

    return {

        findUsers: function (req, res) {
            var filtering = req.body || {};
            Users.find(filtering).then(function (users) {
                Response.okJson(users, res);
            }, function (err) {
                Response.badRequest(err, res);
            });
        },

        login: function (req, res) {
            passport.authenticate('local-login', {
                successRedirect: '/',
                failureRedirect: '/login',
                failureFlash: true
            })(req, res);
        },

        logout: function (req, res) {
            req.logout();
            res.redirect('/login');
        },

        save: function (req, res) {
            var usersData = {
                username: req.body.username,
                password: req.body.password
            };

            Users.save(usersData).then(function (user) {
                Response.okJson(user, res);
            }, function (err) {
                Response.badRequest(err, res);
            });
        }

    };

};