const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

/**
 * Optimizes images.
 *
 * @task optimizeStatic
 */
gulp.task('optimizeStatic', (done) => {
    return gulp.
        src(env.DIR_SRC + '/assets/media/images/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(env.DIR_DEST + '/dist/images'));
});
