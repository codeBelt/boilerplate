var gulp = require('gulp');
var argv = require('yargs').argv;

gulp.task('buildScripts', function(done){
    gulp
        .src(env.DIR_SRC + '/**/*.js')
        .pipe(gulp.dest(env.DIR_DEST))
        .on('end', function () {
            done();
        });
});
