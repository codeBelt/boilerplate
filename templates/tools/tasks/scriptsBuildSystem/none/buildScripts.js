const gulp = require('gulp');
const argv = require('yargs').argv;

gulp.task('buildScripts', (done) => {
    gulp
        .src(env.DIR_SRC + '/**/*.js')
        .pipe(gulp.dest(env.DIR_DEST))
        .on('end', done);
});
