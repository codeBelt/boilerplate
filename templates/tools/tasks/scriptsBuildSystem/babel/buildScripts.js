const gulp = require('gulp');
const argv = require('yargs').argv;
const browserify = require('browserify');
const source = require('vinyl-source-stream');

gulp.task('buildScripts', (done) => {
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
        .on('end', done);
});
