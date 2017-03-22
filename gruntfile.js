
module.exports = function(grunt) {
  var banner =  '/*!\n' +
                ' * Google Maps Helper v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
                ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                ' * Licensed under <%= pkg.license %>\n' +
                ' */\n'

  // Configure tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      js: ['src/js/main.js', 'src/js/ts-compile.js', 'src/js/ts-compile.js.map']
    },
    concat: {
      js: {
        files: {
          'src/js/main.js' : ['src/js/vendor/jquery-shim.js', 'src/js/ts-compile.js']
        }
      }
    },
    ts: {
      options: {
        fast: 'never',
        comments: true
      },
      dev: {
        files: {'src/js/ts-compile.js': ['src/ts/**/*.ts']}
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
        src: 'src/js/main.js',
        dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js',
      },
      dist: {
        options: {
          banner: banner
        },
        src: 'src/js/main.js',
        dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.min.js',
      }
    },
    watch: {
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['concat', 'uglify:dev']
      },
      ts: {
        files: ['src/ts/**/*.ts'],
        tasks: ['ts:dev','concat','uglify:dev']
      }
    }
  })


  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt)
  require('time-grunt')(grunt)


  // Register tasks
  grunt.registerTask('default', ['ts:dev', 'concat','uglify:dev', 'clean'])
  grunt.registerTask('dist', ['ts:dev', 'concat','uglify', 'clean'])
  grunt.registerTask('ts-compile', ['ts:dev'])
};
