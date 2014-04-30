var views = require('./views')();

module.exports = function (app, users, words, passport) {

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    }

    var usersRouting = require('./users')(users, passport);
    var wordsRouting = require('./words')(words);

    app.get('/', isLoggedIn, views.index);
    app.get('/login', views.login);
    app.get('/views/partials/:view', views.view);

    app.post('/login', usersRouting.login);
    app.get('/logout', usersRouting.logout);
    app.put('/users', usersRouting.save);

    app.put('/words', isLoggedIn, wordsRouting.createWord);
    app.post('/words', isLoggedIn, wordsRouting.findWords);
    app.post('/words/:id', isLoggedIn, wordsRouting.updateWord);
    app.del('/words/:id', isLoggedIn, wordsRouting.removeWord);
    app.post('/lessons', isLoggedIn, wordsRouting.findLessons);

};