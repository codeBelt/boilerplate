const gulp = require('gulp');
const argv = require('yargs').argv;

gulp.task('buildMarkup', (done) => {
    gulp
        .src(env.DIR_SRC + '/*.html')
        .pipe(gulp.dest(env.DIR_DEST))
        .on('end', done);
});
