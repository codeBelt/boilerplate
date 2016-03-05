var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var tsify = require('tsify');
var util = require('gulp-util');
var browserSync = require('browser-sync');

gulp.task('buildScripts', function(){
    return browserify()
        .add(env.DIR_SRC + '/assets/scripts/main.ts')
        .plugin(tsify, { target: 'ES5', module: 'commonjs' })
        .bundle().on('error', function (error) { console.error(error.toString()); })
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(gulp.dest(env.DIR_DEST + '/assets/scripts/'))
        .pipe(browserSync.reload({ stream: true }));
});
