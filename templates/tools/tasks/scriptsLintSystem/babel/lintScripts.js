const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('lintScripts', function (done) {
    gulp
        .src([env.DIR_SRC + '/assets/scripts/**/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .on('end', done);
});
