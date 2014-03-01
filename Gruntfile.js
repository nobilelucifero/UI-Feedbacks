module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // 2. Configuration for concatinating files goes here.
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: [
                    'js/libs/*.js',    // All JS in the libs folder
                    'js/functions.js'  // This specific file
                ],
                dest: 'js/_build/main.js',
            },
        },

        uglify: {
            build: {
                src: 'js/_build/main.js',
                dest: 'js/_build/main.min.js'
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'images/build/'
                }]
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/_build/main.css': 'css/main.scss'
                }
            } 
        },

        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['css/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                }
            },
            html: {
                files: ['index.html'],
            }
        },

        connect: {
            // keepalive: true,
            server: {
                options: {
                    port: 8000,
                    base: './'
                }
            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'sass', 'watch']);

    grunt.registerTask('dev', ['connect', 'watch']);

};
