const gulp = require('gulp');
const argv = require('yargs').argv;
var requirejsOptimize = require('gulp-requirejs-optimize');
var sourcemaps = require('gulp-sourcemaps');
//const requirejs = require('gulp-requirejs');

gulp.task('buildScripts', (done) => {
// https://github.com/requirejs/r.js/blob/master/build/example.build.js
    gulp
        .src(env.DIR_SRC + '/assets/scripts/main.js')
        //.pipe(sourcemaps.init())
        .pipe(requirejsOptimize((file) => {
            return {
                name: 'main',
                baseUrl: env.DIR_SRC + '/assets/scripts/',
                mainConfigFile : env.DIR_SRC + '/assets/scripts/config.js',
                optimize: 'uglify2',
                out: 'main.js',
                useStrict: true
            };
        }))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(env.DIR_DEST + '/assets/scripts/'))

    //if (isProd === true) {
    //    requirejs({
    //        name: 'main',
    //        baseUrl: env.DIR_SRC + '/assets/scripts/',
    //        out: 'main.js',
    //        mainConfigFile : env.DIR_SRC + '/assets/scripts/config.js',
    //        optimize: 'uglify2',
    //        shim: {
    //            // standard require.js shim options
    //        }
    //        // ... more require.js options
    //    })
    //        .pipe(gulp.dest(env.DIR_DEST + '/assets/scripts/'))
    //        .on('end', done);
    //} else {
    //    gulp
    //        .src(env.DIR_SRC + '/**/*.js')
    //        .pipe(gulp.dest(env.DIR_DEST))
    //        .on('end', done);
    //}



});



//If using UglifyJS2 for script optimization, these config options can be
//used to pass configuration values to UglifyJS2.
//For possible `output` values see:
//https://github.com/mishoo/UglifyJS2#beautifier-options
//For possible `compress` values see:
//https://github.com/mishoo/UglifyJS2#compressor-options
//uglify2: {
//    //Example of a specialized config. If you are fine
//    //with the default options, no need to specify
//    //any of these properties.
//    output: {
//        beautify: true
//    },
//    compress: {
//        sequences: false,
//            global_defs: {
//            DEBUG: false
//        }
//    },
//    warnings: true,
//        mangle: false
//},
