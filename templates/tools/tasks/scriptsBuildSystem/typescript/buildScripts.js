var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

//http://egorsmirnov.me/2015/05/25/browserify-babelify-and-es6.html
//http://www.gurustop.net/blog/2015/10/27/babel-typescript-compiler-gulp
gulp.task('buildScripts',  function(done) {

    var bundler = browserify({entries: ['./main.ts'], debug: true, extensions: ['.js', '.json', '.ts']});

    return bundler
        .plugin("tsify", {target: 'es6'})
        .transform("babelify", {presets: ["es2015"], extensions: [".js",".ts"]})
        .bundle()
        .on("error", console.log)
        // .pipe(exorcist(jsDir + config.bundleFileName + '.js.map'))
        .pipe(source('out.js'))
        .pipe(gulp.dest('./'))
});
