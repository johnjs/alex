module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: grunt.file.readJSON('../build/jshint.json'),
        lint: {
            backend: ['./*.js', 'routes/*.js', 'app/**/*.js', 'tests/**/*.js', '!tests/public/test-main.js'],
            frontend: ['./public/javascripts/**/*.js']
        },
        watch: {
            files: ['<%= lint.backend %>', '<%= lint.frontend %>'],
            tasks: 'default'
        },
        jsbeautifier: {
            files: '<%= watch.files %>',
            options: {
                js: {
                    "indent_size": 2,
                    "indent_char": " ",
                    "indent_level": 0,
                    "indent_with_tabs": false,
                    "preserve_newlines": true,
                    "max_preserve_newlines": 3,
                    "jslint_happy": false,
                    "brace_style": "collapse",
                    "keep_array_indentation": false,
                    "keep_function_indentation": false,
                    "space_before_conditional": true,
                    "eval_code": false,
                    "indent_case": false,
                    "unescape_strings": false
                }
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['tests/**/*.js', '!tests/public/**/*.js']
            }
        },

        karma: {
            unit: {
                configFile: 'tests/public/karma.conf.js'
            }
        }

    });

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'mochaTest', 'jshint', 'karma']);
    grunt.registerTask('client', ['karma']);

};