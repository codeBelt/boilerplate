var gulp = require('gulp');

gulp.task('buildMarkup', function(done) {
    gulp
        .src(env.DIR_SRC + '/*.html')
        .pipe(gulp.dest(env.DIR_DEST))
        .on('end', function () {
            done();
        });
});
