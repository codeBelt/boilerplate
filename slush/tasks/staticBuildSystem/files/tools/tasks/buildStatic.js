const gulp = require('gulp');

gulp.task('buildStatic', (done) => {
    return gulp
        .src([
            'assets/media/**/*'
        ], {cwd: env.DIR_SRC})
        .pipe(gulp.dest(env.DIR_DEST + '/assets/media/'))
        .on('end', reloadBrowser);
});
