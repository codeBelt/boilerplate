const gulp = require('gulp');
const argv = require('yargs').argv;
var requirejsOptimize = require('gulp-requirejs-optimize');
var sourcemaps = require('gulp-sourcemaps');
const merge = require('merge-stream');

gulp.task('buildScripts', (done) => {
    if (isProd === true) {
        const compileJavaScript = gulp
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
            .pipe(gulp.dest(env.DIR_DEST + '/assets/scripts/'));

        const copyScripts = gulp
            .src([
                env.DIR_SRC + '/assets/vendor/requirejs/require.js',
                env.DIR_SRC + '/assets/scripts/config.js'
            ])
            .pipe(gulp.dest(env.DIR_DEST));

        return merge(compileJavaScript, copyScripts);
    } else {
        gulp
            .src(env.DIR_SRC + '/**/*.js')
            .pipe(gulp.dest(env.DIR_DEST))
            .on('end', done);
    }
});



