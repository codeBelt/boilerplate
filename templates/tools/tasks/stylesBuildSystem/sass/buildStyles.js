var gulp = require('gulp');
var argv = require('yargs').argv;
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('buildStyles', function (done) {
    gulp
        .src(env.DIR_SRC + '/assets/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest(env.DIR_DEST + '/assets/styles/'))
        .on('end', function () {
            done();
        });
});
