var supertest = require('supertest');


module.exports = function (app) {
    var request = supertest(app);

    return {
        put: function (data, address, expectedCode, callback) {
            request.put(address)
                .send(data)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(expectedCode)
                .end(callback);
        },

        post: function (data, address, expectedCode, callback) {
            request.post(address)
                .send(data)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(expectedCode)
                .end(callback);
        },

        get: function (address, expectedCode, callback) {
            request.get(address)
                .set('Accept', 'text/html')
                .expect('Content-Type', /charset=utf-8/)
                .expect(expectedCode, callback);
        },

        delete: function (address, expectedCode, callback) {
            request.del(address)
                .expect(expectedCode)
                .end(callback);
        }
    };
};

