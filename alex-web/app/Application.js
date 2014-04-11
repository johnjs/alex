var express = require('express');
var routes = require('../routes');
var user = require('../routes/user');
var http = require('http');
var path = require('path');

var Application = function (port) {
    this.port = port;
    this._configuration();
    this._initRoutes();

};

Application.prototype = {
    port: null,
    app: null,
    server:null,

    _configuration: function () {
        this.app = express();
        this.app.set('port', this.port);
        this.app.set('views', path.join(__dirname, '../views'));
        this.app.set('view engine', 'jade');
        this.app.use(express.favicon());
        this.app.use(express.logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded());
        this.app.use(express.methodOverride());
        this.app.use(this.app.router);
        this.app.use(express.static(path.join(__dirname, '../public')));

        if ('development' === this.app.get('env')) {
            this.app.use(express.errorHandler());
        }
    },

    _initRoutes: function () {
        this.app.get('/', routes.index);
        this.app.get('/users', user.list);
    },

    start:function(){
        var port = this.app.get('port');
        this.server = http.createServer(this.app).listen(port, function () {
            console.log('Express server listening on port ' + port);
        });
    },
    shutdown:function(onClose){
        this.server.close(onClose);
    }
}

module.exports = Application;



