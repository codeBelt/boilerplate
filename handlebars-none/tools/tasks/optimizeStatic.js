/*jshint node:true */
'use strict';

module.exports = function(grunt) {
    grunt.config.merge({
        imagemin: {
            all: {
                options: {
                    optimizationLevel: 7, // Value from 0 - 7
                },
                files: [{
                    expand: true,
                    cwd: '<%= env.DIR_SRC %>',
                    src: ['assets/media/**/*.{png,gif}'],
                    dest: '<%= env.DIR_SRC %>'
                }]
            }
        }
    });

    grunt.registerTask('optimizeStatic', [
        'imagemin',
    ]);
};
