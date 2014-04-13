var supertest = require('supertest');
var request = supertest('http://localhost:3000');

exports.put = function(data, address, expectedCode, callback) {
    request.put(address)
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(expectedCode)
        .end(callback);
};

exports.get = function(address, expectedCode, callback) {
    request.get(address)
        .set('Accept', 'text/html')
        .expect('Content-Type', /charset=utf-8/)
        .expect(expectedCode, callback);
};

exports.delete = function(address, expectedCode, callback) {
    request.del(address)
        .expect(expectedCode)
        .end(callback);
};