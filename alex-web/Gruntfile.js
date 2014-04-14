module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: grunt.file.readJSON('jshint.json'),
        lint: {
            backend: ['./*.js', 'routes/*.js', 'app/**/*.js', 'tests/**/*.js'],
            frontend:[]
        },
        watch: {
            files: ['<%= lint.backend %>'],
            tasks: 'default'
        },
        complexity: {
            backend: {
                src: '<%= lint.backend %>',
                options: {
                    cyclomatic: 5,
                    halstead: 14,
                    maintainability: 80
                }
            }
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
                src: ['tests/**/*.js']
            }
        }

    });

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task(s).
    grunt.registerTask('default', ['mochaTest', 'jshint']);

};