var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('connectHttp', function() {
    browserSync({
        server: {
            baseDir: env.DIR_DEST
        },
        options: {
            reloadDelay: 250
        },
        notify: false
    });
});
