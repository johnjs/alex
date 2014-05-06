'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({

        jshint: grunt.file.readJSON('../build/jshint.json'),
        jsbeautifier: grunt.file.readJSON('../build/beautifier.json'),

        lint: {
            frontend: ['app/scripts/**/*.js', 'tests/spec/**/*.js'],
            backend: []
        },

        watch: {
            files: ['<%= lint.frontend %>'],
            tasks: 'default'
        },

        karma: {
            unit: {
                configFile: 'tests/karma.conf.js'
            }
        }

    });

    grunt.registerTask('default', ['jsbeautifier','jshint','karma']);
};
