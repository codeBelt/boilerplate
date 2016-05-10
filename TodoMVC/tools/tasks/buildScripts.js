const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const merge = require('merge-stream');
const aliasify = require('aliasify');

gulp.task('buildScripts', (done) => {
    const compileJavaScript = browserify({
        entries: [env.DIR_SRC + '/assets/scripts/main.js'],
        debug: true,
        extensions: ['.js', '.jsx', '.es6']
    })
        .transform('babelify', {
            presets: ['es2015'],
            extensions: ['.js', '.es'],
            // https://github.com/HenriqueLimas/gulp-babelify-starter-kit/blob/master/.babelrc
            // http://babeljs.io/docs/usage/babelrc/
            plugins: [
                'transform-class-properties',
                'transform-async-to-generator',
                'transform-runtime'
            ]
        })
        .transform(aliasify.configure({
            aliases: pkg.aliases
        }))
        .bundle()
        .on('error', function(error) {
            console.error(error.message);
            this.emit('end');
        })
        .pipe(source('main.js'))
        .pipe(gulp.dest(env.DIR_DEST + '/assets/scripts/'));

    const copyVendorScripts = gulp
        .src(env.DIR_SRC + '/assets/vendor/**/*.js')
        .pipe(gulp.dest(env.DIR_DEST + '/assets/vendor/'));

    return merge(compileJavaScript, copyVendorScripts)
        .on('end', reloadBrowser);
});
