var gulp = require('gulp');
var requirejs = require('gulp-requirejs');

gulp.task('buildScripts', function(done){
    //env.DIR_SRC
    requirejs({
        baseUrl: env.DIR_SRC + '/assets/scripts/main.js',
        out: env.DIR_DEST+ '/assets/scripts/',
        shim: {
            // standard require.js shim options
        }
        // ... more require.js options
    })
        .pipe(gulp.dest(env.DIR_DEST + '/assets/scripts/'))
        .on('end', function () {
            done();
        });
});
