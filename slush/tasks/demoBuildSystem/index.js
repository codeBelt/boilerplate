'use strict';

const gulp = require('gulp');
const template = require('gulp-template');
const jsbeautifier = require('gulp-jsbeautifier');
const gulpIf = require('gulp-if');

module.exports = (answers) => {
    if (answers.demoBuildSystem === 'no') { return null; }

    const jsType = answers.scriptsBuildSystem;
    const jsSourcePaths = __dirname + '/files/scripts/' + jsType + '/**/*';
    const testingSourcePaths = __dirname + '/files/tests/' + jsType + '/**/*';

    const stylesType = answers.stylesBuildSystem;
    const stylesSourcePaths = __dirname + '/files/styles/' + stylesType + '/**/*';

    const devDependencies = ['gulp', 'jquery'];
    const bowerDependencies = ['jquery'];

    // Gulp task
    gulp.task('demoBuildSystem', (done) => {
        gulp
            .src([
                jsSourcePaths,
                testingSourcePaths,
                stylesSourcePaths
            ])
            .pipe(template(answers))
            .pipe(gulpIf('*.js', jsbeautifier({
                max_preserve_newlines: 2
            })))
            .pipe(gulp.dest('./'))
            .on('end', done);
    });

    // Return data
    return {
        taskName: 'demoBuildSystem',
        devDependencies: devDependencies,
        bowerDependencies: bowerDependencies
    };
};
