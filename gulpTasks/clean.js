var gulp = require('gulp');
var clean = require('gulp-clean');

// Cleans the web compiled directory.
gulp.task('clean', function () {
    return gulp
        .src([env.DIR_DEST], {read: false})
        .pipe(clean());
});
