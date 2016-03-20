const gulp = require('gulp');
const argv = require('yargs').argv;
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const merge = require('merge-stream');

gulp.task('buildScripts', (done) => {
    const compileJavaScript = browserify({
        entries: [env.DIR_SRC + '/assets/scripts/main.js'],
        debug: true,
        extensions: ['.js', '.jsx', '.es']
    })
        .transform('babelify', {
            presets: ['es2015'],
            extensions: ['.js', '.es'],
            //https://github.com/HenriqueLimas/gulp-babelify-starter-kit/blob/master/.babelrc
            plugins: ['transform-class-properties']
        })
        .bundle()
        .on('error', console.log)
        // .pipe(exorcist(jsDir + config.bundleFileName + '.js.map'))
        .pipe(source('main.js'))
        .pipe(gulp.dest(env.DIR_DEST + '/assets/scripts/'));

    const copyVendorScripts = gulp
        .src(env.DIR_SRC + '/assets/vendor/**/*.js')
        .pipe(gulp.dest(env.DIR_DEST + '/assets/vendor/'));



    return merge(compileJavaScript, copyVendorScripts);
});
