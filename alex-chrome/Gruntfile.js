'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);


    grunt.initConfig({

        jshint: grunt.file.readJSON('../build/jshint.json'),

        lint: {
            frontend: ['app/scripts/**/*.js', 'test/spec/**/*.js'],
            backend: []
        },

        watch: {
            files: ['<%= lint.frontend %>'],
            tasks: 'default'
        },

        karma: {
            unit: {
                options: {
                    files: [
                        'app/bower_components/angular/angular.min.js',
                        'app/bower_components/jquery/dist/jquery.min.js',
                        'app/scripts/**/*.js',
                        'test/spec/**/*.js'
                    ],
                    exclude: [
                        'app/scripts/background.js',
                        'app/scripts/contentscript.js'
                    ]
                },
                frameworks: ['jasmine'],
                reporters: ['story'],
                port: 9876,
                colors: true,
                autoWatch: false,
                browsers: ['PhantomJS'],
                captureTimeout: 60000,
                singleRun: true
            }
        }

    });

    grunt.registerTask('default', ['jshint','karma']);
};
