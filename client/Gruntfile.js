module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
        dist: {
            files: {
                './workspace/sass-workspace.css' : './scss/main.scss'
            }
        }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          './workspace/workspace.css': ['./workspace/sass-workspace.css', './lib/datepicker/angular-date-picker.css', './lib/charts/nv.d3.css']
        }
      }
    },


    ngAnnotate: {
        options: {
            singleQuotes: true
        },
        app: {
            files: {
                './workspace/min-safe/modules.min-safe.js': './components/modules/*.js',
                './workspace/min-safe/routes.min-safe.js': './components/routes/*.js',
                './workspace/min-safe/services.min-safe.js': './components/services/*.js',
                './workspace/min-safe/filters.min-safe.js': './components/filters/*.js',
                './workspace/min-safe/controllers.min-safe.js': './components/controllers/*/*.js',
                './workspace/min-safe/directives.min-safe.js': './components/directives/*/*.js'
            }
        }
    },

    concat: {
        options: {
          separator: ';',
        },
        dist: {
            src: ['./lib/jquery/jquery-2.2.4.js', './lib/angular/angular.min.js', './lib/angular/modules/*.min.js',
                  './lib/charts/d3.js','./lib/charts/nv.d3.js', 'lib/charts/angular-nvd3.js',
                  './lib/datepicker/angular-date-picker.js',
                  './workspace/min-safe/modules.min-safe.js','./workspace/min-safe/services.min-safe.js', './workspace/min-safe/routes.min-safe.js',
                  './workspace/min-safe/filters.min-safe.js', './workspace/min-safe/controllers.min-safe.js','./workspace/min-safe/directives.min-safe.js'],
            dest: './workspace/workspace.js'
        }
    },

    uglify: {
      build: {
        src: './workspace/workspace.js',
        dest: './workspace/workspace.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'cssmin', 'ngAnnotate', 'concat', 'uglify']);

};