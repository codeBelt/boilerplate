var gulp = require('gulp');
var conflict = require('gulp-conflict');

module.exports = function (rootDirectory, answers) {

    gulp.task('markupBuildSystem', function(done) {



    });

    // List dependencies for this package
    return {
        task: 'markupBuildSystem',
        devDependencies: ["tsify", "gulp"]
    };
};