var gulp = require('gulp');

module.exports = function (rootDirectory, answers) {

    gulp.task('requiredFiles', function(done) {
        gulp.src(rootDirectory + '/none/**')
            //.pipe(template(answers))
            //.pipe(rename(function (file) {
            //    if (file.basename[0] === '_') {
            //        file.basename = '.' + file.basename.slice(1);
            //    }
            //}))
            .pipe(gulp.dest('./'))
            //.pipe(install())
            .on('end', function () {
                done();
            });
    });

    return {
        task: 'requiredFiles',
        devDependencies: [
            'gulp',
            'browserify'
        ]
    };
};