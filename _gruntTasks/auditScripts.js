/*jshint node:true, laxbreak:true */
'use strict';

module.exports = function(grunt) {
    grunt.config.merge({
       // Reports out-of-date NPM and Bower libraries
        versioncheck: {
            options: {
                hideUpToDate : false
            }
        },

        // Reports known security vulnerabilities in NPM and Bower libraries
        retire: {
            js: ['<%= env.DIR_BOWER %>/**/*'],
            node: ['./']
        } 
    });

    grunt.registerTask('auditScripts', [
        'force:on',
        'versioncheck',
        'retire',
        'force:reset'
    ]);
};
