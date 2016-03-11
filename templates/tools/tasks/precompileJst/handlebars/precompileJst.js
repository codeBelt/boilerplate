var gulp = require('gulp');
var argv = require('yargs').argv;
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');

gulp.task('precompileJst', function(done){
    gulp
        .src(env.DIR_SRC + '/templates/jst/**/*.hbs')
        .pipe(handlebars({
            handlebars: require('handlebars')
        }))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        //.pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
        //    imports: {
        //// Shortens the file path for the templates.
        //processName: function(filePath) { // input:  src/templates/_header.hbs
        //    return filePath.slice(filePath.indexOf('template'), filePath.lastIndexOf('.')); // output: templates/_header
        //},
        //// Shortens the file path for the partials.
        //processPartialName: function(filePath) { // input:  src/templates/_header.hbs
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
        .pipe(gulp.dest(env.DIR_DEST + '/assets/scripts/'))
        .on('end', function () {
            done();
        });
});
