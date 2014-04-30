var USERS_DATA = {
    username: 'testuser',
    password: 'testpass'
};

exports.credentials = USERS_DATA;
exports.user = function (Users, request) {
    return {
        create: function () {
            return Users.save(USERS_DATA);
        },

        remove: function () {
            return Users.remove(USERS_DATA.username);
        },

        login: function (cbk) {
            request.post(USERS_DATA, '/login', 302, function (req, res) {
                cbk();
            });
        },

        logout: function (cbk) {
            request.get('/logout', 302, function (req, res) {
                cbk();
            });
        },

        createAndLogin: function (ckb) {
            var self = this;
            this.create().then(function () {
                self.login(ckb);
            });
        },

        logoutAndDelete: function (cbk) {
            var self = this;
            var removeAndRunCbk = function () {
                self.remove().then(cbk);
            };

            this.logout(removeAndRunCbk);
        }
    };
};