module.exports = function () {

    return {
        index: function (req, res) {
            res.render('index.jade');
        },

        login: function (req, res) {
            res.render('login.jade', { message: req.flash('loginMessage') });
        },

        logout: function (req, res) {
            req.logout();
            res.redirect('/');
        }

    };
};