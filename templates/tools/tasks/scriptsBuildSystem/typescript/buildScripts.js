var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

//http://egorsmirnov.me/2015/05/25/browserify-babelify-and-es6.html
//http://www.gurustop.net/blog/2015/10/27/babel-typescript-compiler-gulp
gulp.task('buildScripts',  function(done) {
    browserify({
        entries: ['./main.ts'],
        debug: true,
        extensions: ['.js', '.ts']
    })
        .plugin('tsify', {
            target: 'es6'
        })
        .transform('babelify', {
            presets: ['es2015'],
            extensions: ['.js', '.ts']
        })
        .bundle()
        .on('error', console.log)
        // .pipe(exorcist(jsDir + config.bundleFileName + '.js.map'))
        .pipe(source('main.js'))
        .pipe(gulp.dest(env.DIR_DEST))
        .on('end', function () {
            done();
        });
});
