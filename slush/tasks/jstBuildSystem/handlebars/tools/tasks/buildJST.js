const path = require('path');
const gulp = require('gulp');
const handlebars = require('gulp-handlebars');
const wrap = require('gulp-wrap');
const declare = require('gulp-declare');
const concat = require('gulp-concat');
const merge = require('merge-stream');

gulp.task('buildJST', (done) => {
    // Compile partials: Assume all partials start with an underscore
    const partials = gulp
        .src(env.DIR_SRC + '/templates/jst/**/_*.hbs')
        .pipe(handlebars({
            handlebars: require('handlebars')
        }))
        .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
            imports: {
                processPartialName: (fileName) => {
                    // Strip the extension and the underscore. Escape the output with JSON.stringify
                    return JSON.stringify(path.basename(fileName, '.js').substr(1));
                }
            }
        }));

    // Compile templates
    const templates = gulp
        .src(env.DIR_SRC + '/templates/jst/**/[^_]*.hbs')
        .pipe(handlebars({
            handlebars: require('handlebars')
        }))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'JST',
            processName: (filePath) => {
                return filePath.slice(filePath.indexOf('template'), filePath.lastIndexOf('.'));
            },
            noRedeclare: true // Avoid duplicate declarations
        }));

    // Output both the partials and the templates.
    return merge(partials, templates)
        .pipe(concat('precompiledJst.js'))
        .pipe(gulp.dest(env.DIR_DEST + '/assets/scripts/'))
        .on('end', reloadBrowser);
});
