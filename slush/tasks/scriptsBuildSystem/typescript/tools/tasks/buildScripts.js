const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const merge = require('merge-stream');

//http://egorsmirnov.me/2015/05/25/browserify-babelify-and-es6.html
//http://www.gurustop.net/blog/2015/10/27/babel-typescript-compiler-gulp
gulp.task('buildScripts', (done) => {
    const compileJavaScript = browserify({
        entries: [env.DIR_SRC + '/assets/scripts/main.ts'],
        debug: true,
        extensions: ['.js', '.jsx', '.ts']
    })
        .plugin('tsify', {
            target: 'es6'
        })
        .transform('babelify', {
            presets: ['es2015'],
            extensions: ['.js', '.ts'],
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
