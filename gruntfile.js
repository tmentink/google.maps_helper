module.exports = function(grunt) {

  // Configure task(s)
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      js: {
        files: {
          'src/js/application.js' : [ 'src/js/vendor/**/*.js', 
                                      'src/js/base/*.js',
                                      'src/js/component/*.js'
                                    ]
        }
      }
    },
    uglify: {
      dev: {
        options: {
          beautify: {
            beautify: true,
            indent_level: 2,
          },
          mangle: false,
          compress: false,
          preserveComments: 'all'
        },
        src: 'src/js/application.js',
        dest: 'dist/js/google.maps-helper.js'
      },
      dist: {
        src: 'src/js/application.js',
        dest: 'dist/js/google.maps-helper.min.js'
      }
    },
    watch: {
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['concat','uglify:dev']
      }
    } 
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register the task(s)
  grunt.registerTask('default', ['concat','uglify:dev']);
  grunt.registerTask('dist', ['concat','uglify:dist']);
};





