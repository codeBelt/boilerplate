var gulp = require('gulp');

gulp.task('buildScripts', function(done){
    gulp
        .src(env.DIR_SRC + '/**/*.js')
        .pipe(gulp.dest(env.DIR_DEST))
        .on('end', function () {
            done();
        });
});
