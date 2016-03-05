var gulp = require('gulp');

module.exports = function (rootDirectory, answers) {

    if (answers) {
        return null;
    }

    gulp.task('scriptsFramework', function(done) {
        done();
    });

    return {
        taskName: 'scriptsFramework',
        devDependencies: [],
        bowerDependencies: []
    };
};