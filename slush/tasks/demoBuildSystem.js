'use strict';

const gulp = require('gulp');
const merge = require('merge-stream');

module.exports = (rootDirectory, answers) => {
    if (answers.demoBuildSystem === 'no') { return null; }

    let devDependencies = ['gulp'];
    let bowerDependencies = ['jquery'];

    // Gulp task
    gulp.task('demoBuildSystem', (done) => {
        done();
    });

    // Return data
    return {
        taskName: 'demoBuildSystem',
        devDependencies: devDependencies,
        bowerDependencies: bowerDependencies
    };
};
