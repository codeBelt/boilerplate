var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('buildMarkup', function() {
    return gulp
        .src([
            env.DIR_SRC + '/index.html',
            env.DIR_SRC + '/assets/vendor/**',
            env.DIR_SRC + '/assets/data/**',
            env.DIR_SRC + '/assets/media/**'
        ], { base: './src/' })
        .pipe(gulp.dest(env.DIR_DEST))
        .pipe(browserSync.reload({ stream: true }));
});
