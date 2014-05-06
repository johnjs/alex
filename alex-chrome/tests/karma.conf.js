module.exports = function (config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '../',

        files: [
            'app/libs/angular/angular.min.js',
            'app/libs/jquery/dist/jquery.min.js',
            'app/scripts/**/*.js',
            'tests/spec/**/*.js'
        ],
        exclude: [
            'app/scripts/background.js',
            'app/scripts/contentscript.js'
        ],

        frameworks: ['jasmine'],
        reporters: ['story'],
        port: 9876,
        colors: true,
        autoWatch: false,
        browsers: ['PhantomJS'],
        captureTimeout: 60000,
        singleRun: true
    });
};
