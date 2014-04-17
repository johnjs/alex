var views = require('./views')();

module.exports = function(app, users, words, passport){

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()){
            return next();
        }
        res.redirect('/login');
    }

    var usersRouting = require('./users')(users, passport);
    var wordsRouting = require('./words')(words);

    app.get('/', isLoggedIn, views.index);
    app.get('/login', views.login);

    app.post('/login', usersRouting.login);
    app.get('/logout', usersRouting.logout);
    app.post('/users', usersRouting.findUsers);

    app.put('/words', wordsRouting.createWord);
    app.post('/words', wordsRouting.findWords);
    app.post('/words/:id', wordsRouting.updateWord);
    app.del('/words/:id', wordsRouting.removeWord);

};