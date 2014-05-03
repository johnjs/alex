var views = require('./views')();
var Response = require('../app/utils/Response');

module.exports = function (app, users, words, passport) {

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    }

    //TODO[DoMi] Add tests
    function hasAccess(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        Response.unauthorized("You're not logged in!", res);
    }

    var usersRouting = require('./users')(users, passport);
    var wordsRouting = require('./words')(words);

    app.get('/', isLoggedIn, views.index);
    app.get('/login', views.login);
    app.get('/views/partials/:view', views.view);

    app.post('/login', usersRouting.login);
    app.get('/logout', usersRouting.logout);
    app.put('/users', usersRouting.save);

    app.put('/words', hasAccess, wordsRouting.createWord);
    app.post('/words', hasAccess, wordsRouting.findWords);
    app.post('/words/:id', hasAccess, wordsRouting.updateWord);
    app.del('/words/:id', hasAccess, wordsRouting.removeWord);
    app.post('/lessons', hasAccess, wordsRouting.findLessons);

};