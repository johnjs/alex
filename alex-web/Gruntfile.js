module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: grunt.file.readJSON('../build/jshint.json'),
        jsbeautifier: grunt.file.readJSON('../build/beautifier.json'),
        lint: {
            backend: ['./*.js', 'routes/*.js', 'app/**/*.js', 'tests/**/*.js', '!tests/public/test-main.js'],
            frontend: ['./public/javascripts/**/*.js']
        },
        watch: {
            files: ['<%= lint.backend %>', '<%= lint.frontend %>'],
            tasks: 'default'
        },
        env: {
            test: {
                NODE_ENV: 'test'
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['tests/backend/**/*.js']
            }
        },

        karma: {
            unit: {
                configFile: 'tests/public/karma.conf.js'
            }
        },

        protractor: {
            options: {
                keepAlive: true
            },
            all: {
                configFile: 'tests/public/protractor.conf.js'
            }
        },
        shell: {
            protractor_webdriver_manager_update: {
                options: {
                    stdout: true
                },
                command: require('path').resolve(__dirname, 'node_modules', 'protractor', 'bin', 'webdriver-manager') + ' update'
            },
            mongo: {
                command: 'mongod'
            }
        },
        selenium_webdriver_phantom: {
            phantom: {
                options: {
                    phantom: {}
                }
            }
        },
        others: {
            args: ['-port', '8888']
        }

    });

    // Default task(s).
    grunt.registerTask('test:protractor', ['shell:protractor_webdriver_manager_update', 'selenium_webdriver_phantom:phantom', 'protractor', 'selenium_webdriver_phantom:stop']);
    grunt.registerTask('default', ['env:test', 'jsbeautifier', 'jshint', 'mochaTest', 'karma', 'test:protractor']);
    grunt.registerTask('server', ['env:test', 'mochaTest']);
    grunt.registerTask('client', ['karma']);
};
