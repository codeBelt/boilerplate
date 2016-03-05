var gulp = require('gulp');

module.exports = function (rootDirectory, answers) {

    if (answers) {
        return null;
    }

    gulp.task('scriptsBuildSystem', function(done) {

    });

    return {
        task: 'scriptsBuildSystem',
        devDependencies: []
    };
};