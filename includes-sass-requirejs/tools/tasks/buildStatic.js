/*jshint node:true */
'use strict';

module.exports = function(grunt) {
    grunt.config.merge({
        copy: {
            buildStatic: {
                files: [{
                    expand: true,
                    cwd: '<%= env.DIR_SRC %>',
                    src: [
                        '**/.htaccess',
                        '**/*.{asp,aspx,cshtml,jsp,php,py,rb,txt}',
                        'assets/media/**',
                        '!assets/vendor/**'
                    ],
                    dest: '<%= env.DIR_DEST %>'
                }]
            }
        }
    });

    grunt.registerTask('buildStatic', [
        'copy:buildStatic',
    ]);
};
