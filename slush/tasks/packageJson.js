var gulp = require('gulp');
var prettify = require('gulp-jsbeautifier');
var template = require('gulp-template');

var Util = require('../utils/Util');

module.exports = function (rootDirectory, answers, taskResults) {
    // Creates a stringify object of the dev dependencies to be added to the package.json
    var devDependencyJson = Util.generateDevDependenciesWithVersions(taskResults);
    var bowerDependenciesJson = Util.generateBowerDependencies(taskResults);

    gulp.task('packageJson', function (done) {

        var clone = Object.assign({}, answers);
        clone.devDependencies = devDependencyJson;
        clone.bowerDependencies = bowerDependenciesJson;

        gulp
            .src([
                rootDirectory + '/templates/package.json',
                rootDirectory + '/templates/bower.json'
            ])
            .pipe(template(clone))
            .pipe(prettify({ indent_size: 2 }))
            .pipe(gulp.dest('./'))
            .on('end', function () {
                done();
            });
    });

    return {
        taskName: 'packageJson',
        devDependencies: [],
        bowerDependencies: []
    };
};