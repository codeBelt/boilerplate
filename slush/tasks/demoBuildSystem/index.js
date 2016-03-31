'use strict';

const gulp = require('gulp');
const merge = require('merge-stream');
const template = require('gulp-template');

module.exports = (answers) => {
    if (answers.demoBuildSystem === 'no') { return null; }

    const type = answers.scriptsBuildSystem;
    const sourcePath = __dirname + '/templates/src/demoBuildSystem/' + type + '/**/*';
    let devDependencies = ['gulp'];
    let bowerDependencies = ['jquery'];

    // Gulp task
    gulp.task('demoBuildSystem', (done) => {
        gulp
            .src(sourcePath)
            .pipe(template(answers))
            .pipe(gulp.dest('./src/'))
            .on('end', done);
    });

    // Return data
    return {
        taskName: 'demoBuildSystem',
        devDependencies: devDependencies,
        bowerDependencies: bowerDependencies
    };
};
