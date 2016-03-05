var gulp = require('gulp');

module.exports = function (rootDirectory, answers) {

    if (answers) {
        return null;
    }

    gulp.task('stylesBuildSystem', function(done) {
        done();
    });

    return {
        taskName: 'stylesBuildSystem',
        devDependencies: [],
        bowerDependencies: []
    };
};