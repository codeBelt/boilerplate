const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

/**
 * Optimizes images.
 *
 * @task optimizeStatic
 */
gulp.task('optimizeStatic', done => {
    return gulp
        .src(`${ global.env.DIR_SRC }/assets/media/images/**/*.+(png|jpg|gif|svg)`)
        .pipe(imagemin({
            verbose: true,
            progressive: true,
            optimizationLevel: 7,
            use: [pngquant()] // pngquant not included by default in gulp-imagemin
        }))
        .pipe(gulp.dest(`${ global.env.DIR_DEST }/assets/media/images/`));
});
