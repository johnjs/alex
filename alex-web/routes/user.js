var logger = require('../app/utils/Logger');

module.exports = function (Users) {

    return {
        find: function (req, res) {
            var username = req.body.username;
            var usersData = {};

            if (username) {
                usersData = {
                    username: username
                };
            }

            Users.find(usersData).then(function (users) {
                res.send(users);
            }, function (err) {
                logger.logError(err);
            });
        }
    };

};