const gulp = require('gulp');
const argv = require('yargs').argv;
const handlebars = require('gulp-handlebars');
const wrap = require('gulp-wrap');
const declare = require('gulp-declare');
const concat = require('gulp-concat');

gulp.task('precompileJst', (done) => {
    gulp
        .src(env.DIR_SRC + '/templates/jst/**/*.hbs')
        .pipe(handlebars({
            handlebars: require('handlebars')
        }))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        //.pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
        //    imports: {
        //// Shortens the file path for the templates.
        //processName: (filePath) => { // input:  src/templates/_header.hbs
        //    return filePath.slice(filePath.indexOf('template'), filePath.lastIndexOf('.')); // output: templates/_header
        //},
        //// Shortens the file path for the partials.
        //processPartialName: (filePath) => { // input:  src/templates/_header.hbs
        //    return filePath.slice(filePath.indexOf('template'), filePath.lastIndexOf('.')); // output: templates/_header
        //}
        //}
        //}))
        .pipe(declare({
            namespace: 'JST',
            partialRegex: /^_/,

            noRedeclare: true // Avoid duplicate declarations
        }))
        .pipe(concat('precompiledJst.js'))
        .pipe(gulp.dest(env.DIR_SRC + '/assets/scripts/'))
        .on('end', done);
});
