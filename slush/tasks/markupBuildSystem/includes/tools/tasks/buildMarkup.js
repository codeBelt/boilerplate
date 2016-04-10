const gulp = require('gulp');
const fileinclude = require('gulp-file-include');

gulp.task('buildMarkup', (done) => {
    return gulp
        .src(env.DIR_SRC + '/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: env.DIR_SRC
        }))
        .pipe(gulp.dest(env.DIR_DEST))
        .on('end', reloadBrowser);
});
