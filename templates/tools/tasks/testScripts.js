/*jshint node:true, laxbreak:true */
'use strict';

module.exports = function(grunt) {
    grunt.config.merge({
        // Runs tests in real live browsers.
        karma: {
            testScripts: {
                options: {
                    singleRun: true,
                    configFile: 'karma.conf.js',
                    basePath: '<%= env.DIR_SRC %>/assets',
                    coverageReporter: {
                        type: 'html',
                        // path is relative to basePath
                        // adjust to the best location for your project
                        // and backend
                        dir: '../../build-reports/'
                    }
                },
                reporters: grunt.option('coverage')
                    ? ['progress', 'coverage']
                    : ['progress']
            }
        }
    });

    grunt.registerTask('testScripts', [
        'karma:testScripts'
    ]);
};
