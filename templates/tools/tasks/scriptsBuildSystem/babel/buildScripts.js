var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('buildScripts', function(done){
    browserify({
        entries: [env.DIR_SRC + '/assets/scripts/main.js'],
        debug: true,
        extensions: ['.js', '.jsx', '.es']
    })
        .transform('babelify', {
            presets: ['es2015'],
            extensions: ['.js', '.es']
        })
        .bundle()
        .on('error', console.log)
        // .pipe(exorcist(jsDir + config.bundleFileName + '.js.map'))
        .pipe(source('main.js'))
        .pipe(gulp.dest(env.DIR_DEST + '/assets/scripts/'))
        .on('end', function () {
            done();
        });

    //gulp
    //    .src(env.DIR_SRC + '/assets/scripts/main.js')
    //    .pipe(sourcemaps.init())
    //    .pipe(babel({
    //        presets: ['es2015']
    //    }))
    //    .pipe(concat('main.js'))
    //    .pipe(sourcemaps.write('.'))
    //    .pipe(gulp.dest(env.DIR_DEST + '/assets/scripts/'))
    //    .on('end', function () {
    //        done();
    //    });
});



//var bundler = watchify(browserify('./src/index.js', { debug: true }).transform(babel));
//
//function rebundle() {
//    bundler.bundle()
//        .on('error', function(err) { console.error(err); this.emit('end'); })
//        .pipe(source('build.js'))
//        .pipe(buffer())
//        .pipe(sourcemaps.init({ loadMaps: true }))
//        .pipe(sourcemaps.write('./'))
//        .pipe(gulp.dest('./build'));
//}
