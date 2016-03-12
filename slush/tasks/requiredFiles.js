'use strict';

const gulp = require('gulp');
const jsbeautifier = require('gulp-jsbeautifier');
const template = require('gulp-template');
const prettify = require('gulp-prettify');
const merge = require('merge-stream');

module.exports = (rootDirectory, answers) => {

    // Gulp task
    gulp.task('requiredFiles', (done) => {
        const paths = [
            rootDirectory + '/templates/**',
            rootDirectory + '/templates/.*',
            '!' + rootDirectory + '/templates/src/**/*',
            '!' + rootDirectory + '/templates/tools/cache/**/*',
            '!' + rootDirectory + '/templates/tools/tasks/**/*',
            '!' + rootDirectory + '/templates/package.json',
            '!' + rootDirectory + '/templates/Gulpfile.js'
        ];

        const copyFiles = gulp
            .src(paths)
            .pipe(gulp.dest('./'));

        const gulpfileParse = gulp
            .src(rootDirectory + '/templates/Gulpfile.js')
            // Uses Underscore/Lodash templates to add or remove sections
            // which is determined what data is the "answers" object.
            .pipe(template(answers))
            .pipe(jsbeautifier({
            }))
            .pipe(gulp.dest('./'));

        return merge(copyFiles, gulpfileParse);
    });

    // Return data
    return {
        taskName: 'requiredFiles',
        devDependencies: [
            'gulp',
            'yargs',
            'time-require',
            'gulp-load-plugins',
            'require-dir',
            'run-sequence',
            'browser-sync'
        ],
        bowerDependencies: []
    }
};
