const gulp = require('gulp');
const argv = require('yargs').argv;
const merge = require('merge-stream');

gulp.task('buildScripts', (done) => {
    const compileJavaScript = gulp
        .src(env.DIR_SRC + '/**/*.js')
        .pipe(gulp.dest(env.DIR_DEST));

    const copyVendorScripts = gulp
        .src(env.DIR_SRC + '/assets/vendor/**/*.js')
        .pipe(gulp.dest(env.DIR_DEST + '/assets/vendor/'));

    return merge(compileJavaScript, copyVendorScripts);
});
