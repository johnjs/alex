module.exports = function(grunt) {

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
        configFile: 'protractor.conf.js'
      }
    },
    shell: {
      protractor_webdriver_manager_update: {
        options: {
          stdout: true
        },
        command: require('path').resolve(__dirname, 'node_modules', 'protractor', 'bin', 'webdriver-manager') + ' update'
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
      path: '/path/to/selenium/standalone.jar',
      args: ['-port', '8888']
    }

  });

  // Default task(s).
  grunt.registerTask('default', ['jsbeautifier', 'jshint', 'mochaTest', 'jshint', 'karma']);
  grunt.registerTask('client', ['karma']);
  //    grunt.registerTask('test:protractor', ['selenium_webdriver_phantom:phantom', 'protractor', 'selenium_webdriver_phantom:stop']);

};
