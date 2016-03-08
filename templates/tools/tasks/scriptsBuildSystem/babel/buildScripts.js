var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

gulp.task('buildScripts', function(done){
    gulp
        .src(env.DIR_SRC + '/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(env.DIR_DEST))
        .on('end', function () {
            done();
        });
});
