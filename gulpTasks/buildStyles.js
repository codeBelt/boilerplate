var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
//var please = require('gulp-pleeease');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('buildStyles', function () {
    return gulp
        .src(env.DIR_SRC + '/assets/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest(env.DIR_DEST + '/assets/styles/'))
        .pipe(browserSync.reload({ stream: true }));
});
