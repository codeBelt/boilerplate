var gulp = require('gulp');

module.exports = function (rootDirectory, answers) {

    if (answers) {
        return null;
    }

    gulp.task('stylesBuildSystem', function(done) {

    });

    return {
        task: 'stylesBuildSystem',
        devDependencies: []
    };
};