var gulp = require('gulp');
var conflict = require('gulp-conflict');

module.exports = function (rootDirectory, answers) {

    gulp.task('markupBuildSystem', function(done) {

        gulp.src(rootDirectory +'/templates/**')
            //.pipe(template(answers))
            //.pipe(rename(function (file) {
            //    if (file.basename[0] === '_') {
            //        file.basename = '.' + file.basename.slice(1);
            //    }
            //}))
            //.pipe(conflict('./'))
            .pipe(gulp.dest('./'))
            //.pipe(install())
            .on('end', function () {
                done();
            });

    });

    // List dependencies for this package
    return {
        task: 'markupBuildSystem',
        devDependencies: ["tsify", "gulp"]
    };
};