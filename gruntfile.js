
module.exports = function(grunt) {
  var banner =  "/*!\n" +
                " * Google Maps Helper v<%= pkg.version %> (<%= pkg.homepage %>)\n" +
                " * Copyright <%= grunt.template.today('yyyy') %> <%= pkg.author %>\n" +
                " * Licensed under <%= pkg.license %>\n" +
                " */\n"

  // Configure tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    clean: {
      js:   ["src/js/main.js", "src/js/ts-compile.js", "src/js/ts-compile.js.map"],
      dist: ["dist/**/*.js"],
      docs: ["docs_src/js/main.js"]
    },
    concat: {
      js: {
        files: {
          "src/js/main.js": ["src/js/vendor/jquery-shim.js", "src/js/ts-compile.js"]
        }
      },
      docs: {
        files: {
          "docs_src/js/main.js": ["docs_src/js/vendor/jquery.js",
                                  "docs_src/js/vendor/tether.js",
                                  "docs_src/js/vendor/bootstrap.js"
                                 ]
        }
      }
    },
    sass: {
      docs: {
        options: {
          outputStyle: "compressed"
        },
        files: {
          "docs/css/main.min.css": "docs_src/scss/master.scss"
        }
      }
    },
    ts: {
      options: {
        fast: "never",
        comments: true
      },
      dev: {
        files: {"src/js/ts-compile.js": ["src/ts/**/*.ts"]}
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
        src:  "src/js/main.js",
        dest: "dist/<%= pkg.name %>.js",
      },
      dist: {
        options: {
          banner: banner
        },
        src:  "src/js/main.js",
        dest: "dist/<%= pkg.name %>.min.js",
      },
      docs: {
        src:  "docs_src/js/main.js",
        dest: "docs/js/main.min.js",
      }
    },
    watch: {
      js: {
        files: ["src/js/**/*.js"],
        tasks: ["concat", "uglify:dev"]
      },
      ts: {
        files: ["src/ts/**/*.ts"],
        tasks: ["ts:dev","concat","uglify:dev"]
      }
    }
  })

  // These plugins provide necessary tasks.
  require("load-grunt-tasks")(grunt)
  require("time-grunt")(grunt)

  // Register tasks
  grunt.registerTask("default", ["clean:dist", "ts:dev", "concat:js", "uglify:dev", "uglify:dist", "clean:js"])
  grunt.registerTask("docs", ["concat:docs", "sass:docs", "concat:docs", "uglify:docs", "clean:docs"])
  grunt.registerTask("ts-compile", ["ts:dev"])

}


