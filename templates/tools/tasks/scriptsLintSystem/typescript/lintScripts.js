const gulp = require('gulp');
const tslint = require('gulp-tslint');

gulp.task('lintScripts', function (done) {
    gulp
        .src([env.DIR_SRC + '/assets/scripts/**/*.ts','!node_modules/**'])
        .pipe(tslint())
        .pipe(tslint.report("verbose"))
        .on('end', done);
});
