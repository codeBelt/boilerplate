// Karma configuration
module.exports = function(config) {
    'use strict';

    config.set({
        // list of files to load in the browser
        files: [
            'vendor/modernizr/modernizr.js',
            'scripts/config.js',
            'scripts/test-main.js',
            { pattern: 'scripts/**/*.js', included: false },
            { pattern: 'scripts/**/*.html', included: false },
            { pattern: 'vendor/**/*.js', included: false }
        ],

        // list of files to exclude
        exclude: [

        ],

        // web server port
        // Note: this will collide with an error message if others are running
        // on the same shared server
        port: 9876,

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // level of logging
        // possible values:
        // config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_WARN,

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'scripts/**/!(config*|*.spec).js': 'coverage'
        },

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'requirejs'],

        // test results reporter to use
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],

        ///////////////////////////////////////////////////////////////////////////
        // Note: the following settings are only used when running karma
        // directly as `karma start`.
        //
        // When running as `grunt test` these are overridden in the Gruntfile.js.
        // base path that will be used to resolve all patterns (eg. files, exclude)
        ///////////////////////////////////////////////////////////////////////////

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: 'src/assets/',

        // path is relative to basePath
        coverageReporter: {
            type: 'html',
            dir: '../../build-reports/'
        }
    });
};
