'use strict';

const gulp = require('gulp');
const merge = require('merge-stream');

module.exports = (answers) => {
    if (answers.installerSystem === 'no') { return null; }

    // Files and folder locations
    const files = __dirname + '/files/**/*';

    // Gulp task
    gulp.task('installerSystem', (done) => {
        gulp
            .src(files)
            .pipe(gulp.dest('./'))
            .on('end', done);
    });

    // Return data
    return {
        taskName: 'installerSystem',
        devDependencies: [],
        bowerDependencies: []
    };
};
