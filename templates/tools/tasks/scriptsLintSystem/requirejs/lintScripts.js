const gulp = require('gulp');
const jshint = require('gulp-jshint');

gulp.task('lintScripts', function (done) {
    gulp
        .src([env.DIR_SRC + '/assets/scripts/**/*.js','!node_modules/**'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .on('end', done);
});
