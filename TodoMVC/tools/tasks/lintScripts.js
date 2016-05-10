const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('lintScripts', function (done) {
    return gulp
        .src([
            env.DIR_SRC + '/assets/scripts/**/*.js',
            '!node_modules/**',
            '!**/precompiledJst.js'
        ])
        .pipe(eslint())
        .pipe(eslint.format());
});
