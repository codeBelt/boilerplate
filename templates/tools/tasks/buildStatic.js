const gulp = require('gulp');

gulp.task('buildStatic', (done) => {
    gulp
        .src([
            '**/.htaccess',
            '**/*.{asp,aspx,cshtml,jsp,php,py,rb,txt}',
            'assets/media/**',
            '!assets/media/images/',
            '!assets/vendor/**'
        ], {cwd: env.DIR_SRC})
        .pipe(gulp.dest(env.DIR_DEST))
        .on('end', done);
});
