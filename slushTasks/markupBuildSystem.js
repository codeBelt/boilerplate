var gulp = require('gulp');
var conflict = require('gulp-conflict');

module.exports = function (rootDirectory, answers) {

    if (answers) {
        return null;
    }

    gulp.task('markupBuildSystem', function(done) {
        done();
    });

    // List dependencies for this package
    return {
        taskName: 'markupBuildSystem',
        devDependencies: ["tsify", "gulp"],
        bowerDependencies: []
    };
};