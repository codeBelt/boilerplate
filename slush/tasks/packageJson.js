'use strict';

const gulp = require('gulp');
const prettify = require('gulp-jsbeautifier');
const template = require('gulp-template');
const install = require('gulp-install');

const Util = require('../utils/Util');

module.exports = (rootDirectory, answers, taskResults) => {
    // Creates a stringify object of the dev dependencies to be added to the package.json
    const devDependencyJson = Util.generateDevDependenciesWithVersions(taskResults);
    const bowerDependenciesJson = Util.generateBowerDependencies(taskResults);

    gulp.task('packageJson', (done) => {

        const clone = Object.assign({}, answers);
        clone.devDependencies = devDependencyJson;
        clone.bowerDependencies = bowerDependenciesJson;

        gulp
            .src([
                rootDirectory + '/templates/package.json',
                rootDirectory + '/templates/bower.json'
            ])
            .pipe(template(clone))
            .pipe(prettify({
                indent_size: 2
            }))
            .pipe(gulp.dest('./'))
            //.pipe(install())
            .on('end', done);
    });

    return {
        taskName: 'packageJson',
        devDependencies: [],
        bowerDependencies: []
    }
};
