var logger = require("./Logger");

var prepareResponseWithMessage = function(res, code, message) {
    res.writeHead(code, {
        "Content-Type": "application/json"
    });
    res.end(JSON.stringify({
        message: message
    }));
};

var prepareResponseWithJson = function(res, code, obj) {
    res.writeHead(code, {
        "Content-Type": "application/json"
    });
    res.end(JSON.stringify(obj));
};

exports.okJson = function(obj, res) {
    prepareResponseWithJson(res, 200, obj);
};

exports.ok = function(message, res) {
    logger.logResponse('info', message, res);
    prepareResponseWithMessage(res, 200, message);
};

exports.badRequest = function(message, res) {
    logger.logResponse('warn', message, res);
    prepareResponseWithMessage(res, 400, message);
};

exports.notFound = function(message, res) {
    logger.logResponse('warn', message, res);
    prepareResponseWithMessage(res, 404, message);
};

exports.internalError = function(message, res) {
    logger.logResponse('error', message, res);
    prepareResponseWithMessage(res, 500, message);
};
