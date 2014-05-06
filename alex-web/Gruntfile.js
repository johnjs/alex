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
    }

  });

  // Default task(s).
  grunt.registerTask('default', ['jsbeautifier', 'jshint', 'mochaTest', 'jshint', 'karma']);
  grunt.registerTask('client', ['karma']);

};
