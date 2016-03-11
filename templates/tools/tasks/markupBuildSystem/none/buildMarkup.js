var gulp = require('gulp');
var argv = require('yargs').argv;

gulp.task('buildMarkup', function(done) {
    gulp
        .src(env.DIR_SRC + '/*.html')
        .pipe(gulp.dest(env.DIR_DEST))
        .on('end', function () {
            done();
        });
});
