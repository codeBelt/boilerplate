const gulp = require('gulp');
const argv = require('yargs').argv;

gulp.task('buildStyles', (done) => {
    gulp
        .src(env.DIR_SRC + '/assets/styles/**/*.css')
        .pipe(gulp.dest(env.DIR_DEST + '/assets/styles/'))
        .on('end', done);
});
