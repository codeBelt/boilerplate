const gulp = require('gulp');
const argv = require('yargs').argv;
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

gulp.task('optimizeStatic', (done) => {
    gulp
        .src(env.DIR_SRC + '/assets/media/images/**/*.{png,gif}')
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 7,
            //svgoPlugins: [
            //    {removeViewBox: false},
            //    {cleanupIDs: false}
            //],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(env.DIR_DEST + '/assets/media/images/'))
        .on('end', done);
});
