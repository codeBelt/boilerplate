'use strict';

const gulp = require('gulp');
const jsbeautifier = require('gulp-jsbeautifier');
const template = require('gulp-template');
const install = require('gulp-install');
const prettify = require('gulp-prettify');
const merge = require('merge-stream');

const Util = require('../../utils/Util');

module.exports = (rootDirectory, answers, taskResults) => {
    // Creates a stringify object of the dev dependencies to be added to the package.json
    const devDependencyJson = Util.generateDevDependenciesWithVersions(taskResults);
    const bowerDependenciesJson = Util.generateBowerDependenciesWithVersions(taskResults);

    // Gulp task
    gulp.task('mainBuildSystem', (done) => {

        const clone = Object.assign({}, answers);
        clone.devDependencies = devDependencyJson;
        clone.bowerDependencies = bowerDependenciesJson;

        const json = gulp
            .src([
                rootDirectory + '/slush/tasks/mainBuildSystem/files/package.json',
                rootDirectory + '/slush/tasks/mainBuildSystem/files/bower.json'
            ])
            .pipe(template(clone))
            .pipe(jsbeautifier({
                indent_size: 2
            }))
            .pipe(gulp.dest('./'));
        //.pipe(install())

        const gulpfileParse = gulp
            .src(rootDirectory + '/slush/tasks/mainBuildSystem/files/Gulpfile.js')
            // Uses Underscore/Lodash templates to add or remove sections
            // which is determined what data is the "answers" object.
            .pipe(template(answers))
            .pipe(jsbeautifier({
                max_preserve_newlines: 2
            }))
            .pipe(gulp.dest('./'));

        const files = gulp
            .src([
                rootDirectory + '/slush/tasks/mainBuildSystem/files/**/*',
                rootDirectory + '/slush/tasks/mainBuildSystem/files/**/.*',
                '!' + rootDirectory + '/slush/tasks/mainBuildSystem/files/Gulpfile.js',
                '!' + rootDirectory + '/slush/tasks/mainBuildSystem/files/package.json',
                '!' + rootDirectory + '/slush/tasks/mainBuildSystem/files/bower.json'
            ])
            .pipe(gulp.dest('./'));

        return merge(json, gulpfileParse, files);
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
