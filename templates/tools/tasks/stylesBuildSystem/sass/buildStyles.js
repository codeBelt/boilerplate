const gulp = require('gulp');
const argv = require('yargs').argv;
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('buildStyles', (done) => {
    gulp
        .src(env.DIR_SRC + '/assets/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest(env.DIR_DEST + '/assets/styles/'))
        .on('end', done);
});
