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
            rootDirectory + '/templates/*',
            rootDirectory + '/templates/.*',
            '!' + rootDirectory + '/templates/scriptsLintSystem',
            '!' + rootDirectory + '/templates/scriptsLintSystem/**/*',
            '!' + rootDirectory + '/templates/src/**/*',
            '!' + rootDirectory + '/templates/tools/cache/**/*',
            '!' + rootDirectory + '/templates/tools/tasks/**/*',
            '!' + rootDirectory + '/templates/package.json',
            '!' + rootDirectory + '/templates/Gulpfile.js'
        ];

        const copyFiles = gulp
            .src(paths)
            .pipe(gulp.dest('./'));

        const copyTask = gulp
            .src([
                rootDirectory + '/templates/tools/tasks/buildStatic.js'
            ])
            .pipe(gulp.dest('./tools/tasks/'));

        const gulpfileParse = gulp
            .src(rootDirectory + '/templates/Gulpfile.js')
            // Uses Underscore/Lodash templates to add or remove sections
            // which is determined what data is the "answers" object.
            .pipe(template(answers))
            .pipe(jsbeautifier({
                max_preserve_newlines: 2
            }))
            .pipe(gulp.dest('./'));

        return merge(copyFiles, gulpfileParse);
    });

    // Return data
    return {
        taskName: 'requiredFiles',
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
