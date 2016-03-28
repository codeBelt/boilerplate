const gulp = require('gulp');
const argv = require('yargs').argv;
const fileinclude = require('gulp-file-include');

gulp.task('buildMarkup', (done) => {
    gulp
        .src(env.DIR_SRC + '/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: env.DIR_SRC
        }))
        .pipe(gulp.dest(env.DIR_DEST))
        .on('end', done);
});
