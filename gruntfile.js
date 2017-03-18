module.exports = function(grunt) {
  var banner =  '/*!\n' +
                ' * <%= pkg.name %> - v<%= pkg.version %> | <%= pkg.license %> License\n' +
                ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                ' * <%= pkg.homepage %>\n' +
                ' */\n'

  // Configure task(s)
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      js: {
        files: {
          'src/js/main.js' : ['src/js/vendor/jquery-shim.js', 'src/js/ts-compile.js']
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
        src: 'src/js/main.js',
        dest: 'dist/google.maps-helper.js',
      },
      dist: {
        options: {
          banner: banner
        },
        src: 'src/js/main.js',
        dest: 'dist/google.maps-helper.min.js',
      }
    },
    watch: {
      ts: {
        files: ['src/ts/**/*.ts'],
        tasks: ['ts:dev','concat','uglify:dev']
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
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ts');

  // Register the task(s)
  grunt.registerTask('default', ['ts:dev','concat','uglify:dev']);
  grunt.registerTask('dist', ['ts:dev','concat','uglify']);
};

