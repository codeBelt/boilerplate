'use strict';

const gulp = require('gulp');

module.exports = (answers) => {
    if (answers.mockDataSystem === 'no') { return null; }

    const type = answers.mockDataSystem;
    let devDependencies = [];

    switch (type) {
        case 'jsonServer':
            devDependencies = ['faker', 'lodash', 'json-server'];
            break;
    }

    // Files and folder locations
    const path = __dirname + '/' + type + '/**/*';

    // Gulp task
    gulp.task('mockDataSystem', (done) => {
        return gulp
            .src(path)
            .pipe(gulp.dest('./src/'));
    });

    // Return data
    return {
        taskName: 'mockDataSystem',
        devDependencies: devDependencies,
        bowerDependencies: []
    };
};
