/*jshint node:true, laxbreak:true */
'use strict';

module.exports = function(grunt) {
    var pkg = require('../../package.json');
    var shouldMinify = !grunt.option('dev');

    grunt.config.merge({
        copy: {
            buildMarkup: {
                files: [{
                    expand: true,
                    cwd: '<%= env.DIR_SRC %>',
                    dest: '<%= env.DIR_TMP %>',
                    src: ['**/*.html','!assets/vendor/**']
                }]
            }
        },

        // Injects version numbers for cache busting.
        'string-replace': {
            buildMarkup: {
                options: {
                    replacements: [{
                        pattern: /@@version/g,
                        replacement: pkg.version
                    }]
                },
                files: [{
                    expand: true,
                    cwd: '<%= env.DIR_TMP %>',
                    dest: '<%= env.DIR_DEST %>',
                    src: ['**/*.html']
                }]
            }
        },

        // Replaces script and style tag references with a reference to a
        // single optimized output file.
        usemin: {
            html: ['<%= env.DIR_DEST %>/**/*.html']
        }
    });

    grunt.registerTask('buildMarkup',
        shouldMinify
            ? [
                'copy:buildMarkup',
                'string-replace:buildMarkup',
                'usemin'
            ]
            : [
                'copy:buildMarkup',
                'string-replace:buildMarkup'
            ]
    );
};
