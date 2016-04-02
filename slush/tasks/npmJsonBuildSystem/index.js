'use strict';

const gulp = require('gulp');
const jsbeautifier = require('gulp-jsbeautifier');
const template = require('gulp-template');

const Util = require('../../utils/Util');

module.exports = (answers, taskResults) => {
    // Creates a stringify object of the dev dependencies to be added to the package.json
    const devDependencyJson = Util.generateDevDependenciesWithVersions(taskResults);
    const bowerDependenciesJson = Util.generateBowerDependenciesWithVersions(taskResults);

    // Gulp task
    gulp.task('npmJsonBuildSystem', (done) => {

        const clone = Object.assign({}, answers);
        clone.devDependencies = devDependencyJson;
        clone.bowerDependencies = bowerDependenciesJson;

        const json = gulp
            .src([
                __dirname + '/files/package.json',
                __dirname + '/files/bower.json'
            ])
            .pipe(template(clone))
            .pipe(jsbeautifier({
                indent_size: 2
            }))
            .pipe(gulp.dest('./'))
            //.pipe(install())
            .on('end', done);
    });

    // Return data
    return {
        taskName: 'npmJsonBuildSystem'
    }
};
