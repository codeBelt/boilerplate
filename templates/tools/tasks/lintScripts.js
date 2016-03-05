/*jshint node:true, laxbreak:true */
'use strict';

module.exports = function(grunt) {
    grunt.config.merge({
        // Verifies that script files conform to set standards.
        jshint: {
            lintScripts: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: [
                    'Gruntfile.js',
                    '<%= env.DIR_SRC %>/assets/scripts/**/*.js'
                ]
            }
        }
    });

    grunt.registerTask('lintScripts', [
        'force:on',
        'jshint:lintScripts',
        'force:reset'
    ]);
};
