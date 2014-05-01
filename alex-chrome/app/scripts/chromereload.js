// Reload client for Chrome Apps & Extensions.
// The reload client has a compatibility with livereload.
// WARNING: only supports reload command.

var LIVERELOAD_HOST = 'localhost:';
var LIVERELOAD_PORT = 35729;
var connection = new WebSocket('ws://' + LIVERELOAD_HOST + LIVERELOAD_PORT + '/livereload');

connection.onmessage = function (e) {
    if (e.data) {
        var data = JSON.parse(e.data);
        if (data && data.command === 'reload') {
            chrome.runtime.reload();
        }
    }
};
