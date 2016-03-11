var gulp = require('gulp');
var argv = require('yargs').argv;
var fileinclude = require('gulp-file-include');

gulp.task('buildMarkup', function(done) {
    gulp
        .src(env.DIR_SRC + '/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: env.DIR_SRC
        }))
        .pipe(gulp.dest(env.DIR_DEST))
        .on('end', function () {
            done();
        });
});
