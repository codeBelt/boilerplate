'use strict';

const gulp = require('gulp');
const jsbeautifier = require('gulp-jsbeautifier');
const prettify = require('gulp-prettify');
const merge = require('merge-stream');
const preprocess = require('gulp-preprocess');
const nunjucks = require('gulp-nunjucks');

const Util = require('../../utils/Util');

module.exports = (answers) => {

    // Gulp task
    gulp.task('mainBuildSystem', (done) => {
        const files = gulp
            .src([
                __dirname + '/files/*',
                __dirname + '/files/.*',
                '!' + __dirname + '/files/Gulpfile.js',
                '!' + __dirname + '/files/README.md',
                '!' + __dirname + '/files/package.json',
                '!' + __dirname + '/files/bower.json'
            ])
            .pipe(gulp.dest('./'));
console.log("answers", {context : answers});

        const gulpfileParse = gulp
            .src([
                __dirname + '/files/tools/**/*',
                __dirname + '/files/Gulpfile.js',
                __dirname + '/files/README.md'
            ], { base: __dirname + '/files/' })
            .pipe(nunjucks.compile(answers))
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
            'gulp-cssnano',
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
