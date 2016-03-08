var gulp = require('gulp');
var requirejs = require('gulp-requirejs');

gulp.task('buildScripts', function(done){
    //env.DIR_SRC
    requirejs({
        baseUrl: 'path/to/your/base/file.js',
        out: 'FILENAME\_TO\_BE\_OUTPUTTED',
        shim: {
            // standard require.js shim options
        },
        // ... more require.js options
    })
        .pipe(gulp.dest(env.DIR_DEST))
        .on('end', function () {
            done();
        });
});
