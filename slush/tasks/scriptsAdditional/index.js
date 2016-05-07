'use strict';

const gulp = require('gulp');

module.exports = (answers) => {
    if (answers.scriptsAdditional.length === 0) { return null; }

    const scriptsAdditional = answers.scriptsAdditional;
    const bowerDependencies = scriptsAdditional;

    // Gulp task
    gulp.task('scriptsAdditional', (done) => {
        done();
    });

    // Return data
    return {
        taskName: 'scriptsAdditional',
        devDependencies: [],
        bowerDependencies: bowerDependencies
    }
};
