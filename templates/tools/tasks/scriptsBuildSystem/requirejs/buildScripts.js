const gulp = require('gulp');
const argv = require('yargs').argv;
const requirejs = require('gulp-requirejs');

gulp.task('buildScripts', (done) => {
    //if (isProd === true) {
        requirejs({
            name: 'main',
            baseUrl: env.DIR_SRC + '/assets/scripts/',
            out: 'main.js',
            mainConfigFile : env.DIR_SRC + '/assets/scripts/config.js',
            optimize: 'uglify2',
            shim: {
                // standard require.js shim options
            }
            // ... more require.js options
        })
            .pipe(gulp.dest(env.DIR_DEST + '/assets/scripts/'))
            .on('end', done);
    //} else {
    //    gulp
    //        .src(env.DIR_SRC + '/**/*.js')
    //        .pipe(gulp.dest(env.DIR_DEST))
    //        .on('end', done);
    //}



});


//almond                 : true,
//    name                   : "st",
//    baseUrl                : "scripts",
//    mainConfigFile         : "scripts/st.js",
//    include                : "st",
//    out                    : "scripts/st.build.js",
//    wrap                   : true,
//    optimize               : "uglify2",
//    generateSourceMaps     : true,
//    preserveLicenseComments: false
