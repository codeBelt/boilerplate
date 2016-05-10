const gulp = require('gulp');
const hb = require('gulp-hb');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const prettify = require('gulp-prettify');

gulp.task('buildMarkup', (done) => {
    return gulp
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
        .pipe(rename((path) => {
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
        .on('end', reloadBrowser);
});
