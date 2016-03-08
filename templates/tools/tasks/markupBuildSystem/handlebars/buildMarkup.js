var gulp = require('gulp');
var hb = require('gulp-hb');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var prettify = require('gulp-prettify');

gulp.task('buildMarkup', function(done) {
    gulp
        .src([
            env.DIR_SRC + '/**/*.hbs',
            '!' + env.DIR_SRC + '/templates/**',
            '!' + env.DIR_SRC + '/assets/vendor/**'
        ])
        .pipe(hb({
            partials: env.DIR_SRC + '/templates/**/*.hbs',
            helpers: env.DIR_NPM + '/handlebars-layouts/index.js',
            data: env.DIR_SRC + '/assets/data/*.json'
        }))
        .pipe(rename(function (path) {
            path.extname = '.html'
        }))
        .pipe(replace(/@@version/g, pkg.version))
        .pipe(prettify({
            indent_size: 4,
            indent_inner_html : true,
            wrap_line_length: 999999,
            unformatted: [
                'a', 'b', 'code', 'i', 'p',
                'pre', 'small', 'span',
                'sub', 'sup', 'u', 'textarea',
                'strong', 'em', 'svg'
            ]
        }))
        .pipe(gulp.dest(env.DIR_DEST))
        .on('end', function () {
            done();
        });
});
