var gulp = require('gulp');

module.exports = function (rootDirectory, answers) {

    if (answers) {
        return null;
    }

    gulp.task('additionalScripts', function(done) {
        done();
    });

    return {
        task: 'additionalScripts',
        devDependencies: []
    };
};