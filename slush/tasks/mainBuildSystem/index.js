'use strict';

const gulp = require('gulp');
const jsbeautifier = require('gulp-jsbeautifier');
const template = require('gulp-template');
const install = require('gulp-install');
const prettify = require('gulp-prettify');
const merge = require('merge-stream');

const Util = require('../../utils/Util');

module.exports = (answers) => {

    // Gulp task
    gulp.task('mainBuildSystem', (done) => {
        const files = gulp
            .src([
                __dirname + '/files/**/*',
                __dirname + '/files/**/.*',
                '!' + __dirname + '/files/Gulpfile.js',
                '!' + __dirname + '/files/package.json',
                '!' + __dirname + '/files/bower.json'
            ])
            .pipe(gulp.dest('./'));

        const gulpfileParse = gulp
            .src(__dirname + '/files/Gulpfile.js')
            // Uses Underscore/Lodash templates to add or remove sections
            // which is determined what data is the "answers" object.
            .pipe(template(answers))
            .pipe(jsbeautifier({
                max_preserve_newlines: 2
            }))
            .pipe(gulp.dest('./'));

        return merge(gulpfileParse, files);
    });

    // Return data
    return {
        taskName: 'mainBuildSystem',
        devDependencies: [
            'gulp',
            'del',
            'gulp-uglify',
            'gulp-header',
            'gulp-clean-css',
            'gulp-useref',
            'gulp-if',
            'yargs',
            'time-require',
            'require-dir',
            'run-sequence',
            'browser-sync'
        ],
        bowerDependencies: []
    }
};
