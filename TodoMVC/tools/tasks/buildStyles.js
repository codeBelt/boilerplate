const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const gulpIf = require('gulp-if');
const plumber = require('gulp-plumber');

const allowAutoPrefixer = true;

gulp.task('buildStyles', (done) => {
    return gulp
        .src(env.DIR_SRC + '/assets/styles/*.scss')
        .pipe(plumber())
        .pipe(sass.sync())
        .pipe(gulpIf(allowAutoPrefixer, autoprefixer('last 2 versions')))
        .pipe(gulp.dest(env.DIR_DEST + '/assets/styles/'))
        .pipe(reloadBrowser({stream: true}));
});
