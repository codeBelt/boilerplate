const gulp = require('gulp');
const argv = require('yargs').argv;
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const gulpIf = require('gulp-if');

const allowAutoPrefixer = <%= stylesFeatures.indexOf("autoprefixer") >= 0 %>;

gulp.task('buildStyles', (done) => {
    gulp
        .src(env.DIR_SRC + '/assets/scss/*.scss')
        .pipe(sass())
        .pipe(gulpIf(allowAutoPrefixer, autoprefixer('last 2 versions')))
        .pipe(gulp.dest(env.DIR_DEST + '/assets/styles/'))
        .on('end', done);
});
