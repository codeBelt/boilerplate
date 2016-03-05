var gulp = require('gulp');

module.exports = function (rootDirectory, answers) {

    if (answers) {
        return null;
    }

    gulp.task('framework', function(done) {
        done();
    });

    return {
        task: 'framework',
        devDependencies: []
    };
};