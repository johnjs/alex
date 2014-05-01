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
        }

    });

    grunt.registerTask('default', ['jshint']);
};
