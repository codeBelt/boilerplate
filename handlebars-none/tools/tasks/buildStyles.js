/*jshint node:true, laxbreak:true */
'use strict';

module.exports = function(grunt) {
    var shouldMinify = !grunt.option('dev');

    // Help Grunt find the right plugins at runtime
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

    // Clear out any previously generated usemin task configuration
    grunt.config.set('concat', undefined);
    grunt.config.set('cssmin', undefined);

    grunt.config.merge({
        // Copies static files for non-optimized builds
        copy: {
            buildStyles: {
                files: [{
                    expand: true,
                    cwd: '<%= env.DIR_SRC %>',
                    dest: '<%= env.DIR_DEST %>',
                    src: ['assets/{styles,vendor}/**/*.css']
                }]
            }
        },

        cssmin: {
            buildStyles: {
                files: [{
                    expand: true,
                    cwd: '<%= env.DIR_SRC %>',
                    dest: '<%= env.DIR_DEST %>',
                    src: [
                        'assets/styles/print.css',
                        'assets/styles/ie9.css',
                        'assets/styles/ie8.css',
                        'assets/styles/ie7.css'
                    ]
                }]
            }
        },

        // Searches for build comment blocks (`<!-- build:css -->`) and generates
        // the appropriate `concat` and `cssmin` configuration.
        useminPrepare: {
            options: {
                root: '<%= env.DIR_SRC %>',
                staging: '<%= env.DIR_TMP %>',
                dest: '<%= env.DIR_DEST %>',
                flow: {
                    buildStyles: {
                        // Force css only
                        steps: { css: ['concat', 'cssmin'], js: [] },
                        post: {}
                    }
                }
            },
            buildStyles: ['<%= env.DIR_SRC %>/**/*.hbs']
        }
    });

    grunt.registerTask('scrub:buildStyles', function() {
        function scrub(name) {
            var config = JSON
                .stringify(grunt.config.get(name))
                .replace(/\?v=@@version/g, '');

            grunt.config.set(name, JSON.parse(config));
        }

        scrub('concat');
        scrub('cssmin');
    });

    grunt.registerTask('buildStyles',
        shouldMinify
            ? [
                'useminPrepare:buildStyles',
                'scrub:buildStyles',
                'concat:generated',
                'cssmin:generated',
                'cssmin:buildStyles'
            ]
            : [
                'copy:buildStyles'
            ]
    );
};
