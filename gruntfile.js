module.exports = function(grunt) {
  var banner =  '/* <%= pkg.name %> - v<%= pkg.version %> | <%= pkg.license %> License\n' +
                ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                ' * <%= pkg.homepage %>\n' +
                ' */\n'

  // Configure task(s)
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      js: {
        files: {
          'src/js/application.js' : [ 'src/js/vendor/**/*.js',
                                      'src/js/base/object/*.js', 
                                      'src/js/base/**/*.js',
                                      'src/js/component/**/*.js'
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
          preserveComments: false,
          banner: banner
        },
        src: 'src/js/application.js',
        dest: 'dist/google.maps-helper.js',
      },
      dist: {
        options: {
          banner: banner
        },
        src: 'src/js/application.js',
        dest: 'dist/google.maps-helper.min.js',
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





