const gulp = require('gulp');
const runSequence = require('run-sequence').use(gulp);
const argv = require('yargs').argv;
var requirejsOptimize = require('gulp-requirejs-optimize');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('buildScripts', (done) => {

    gulp.task('requirejs:minify', (done) => {
        gulp
            .src(env.DIR_SRC + '/assets/scripts/main.js')
            //.pipe(sourcemaps.init())
            .pipe(requirejsOptimize((file) => {
                return {
                    name: 'main',
                    baseUrl: env.DIR_SRC + '/assets/scripts/',
                    mainConfigFile : env.DIR_SRC + '/assets/scripts/config.js',
                    out: 'main.js',
                    useStrict: true,
                    optimize: 'uglify2',
                    uglify2: {
                        output: {
                            beautify: false
                        },
                        compress: {
                            sequences: false,
                            global_defs: {
                                DEBUG: false
                            }
                        },
                        warnings: true,
                        mangle: false
                    }
                };
            }))
            //.pipe(sourcemaps.write())
            .pipe(gulp.dest(env.DIR_DEST + '/assets/scripts/'))
            .on('end', done);
    });

    gulp.task('requirejs:copySome', (done) => {
        gulp
            .src([
                env.DIR_SRC + '/assets/vendor/requirejs/require.js',
                env.DIR_SRC + '/assets/scripts/config.js'
            ], {base: env.DIR_SRC})
            .pipe(gulp.dest(env.DIR_DEST))
            .on('end', done);
    });

    gulp.task('requirejs:copyAll', (done) => {
        gulp
            .src(env.DIR_SRC + '/**/*.js')
            .pipe(gulp.dest(env.DIR_DEST))
            .on('end', done);
    });

    const tasks = [];
    if (isProd === true) {
        tasks.push(['requirejs:copySome'], ['requirejs:minify']);
    } else {
        tasks.push('requirejs:copyAll');
    }

    runSequence(...tasks, done);
});



