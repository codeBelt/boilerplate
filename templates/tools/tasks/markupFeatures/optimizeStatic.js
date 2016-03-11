var gulp = require('gulp');
var argv = require('yargs').argv;
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('optimizeStatic', function(done) {
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
        .on('end', function () {
            done();
        });
});
