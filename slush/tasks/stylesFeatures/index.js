'use strict';

const gulp = require('gulp');

module.exports = (rootDirectory, answers) => {
    if (answers.stylesFeatures.length === 0) { return null; }

    const stylesFeatures = answers.stylesFeatures;
    const paths = [];

    if (stylesFeatures.indexOf('print') >= 0) {
        paths.push(rootDirectory + '/templates/src/assets/styles/print.css');
    }

    if (stylesFeatures.indexOf('ie9') >= 0) {
        paths.push(rootDirectory + '/templates/src/assets/styles/ie9.css');
    }

    if (stylesFeatures.indexOf('ie8') >= 0) {
        paths.push(rootDirectory + '/templates/src/assets/styles/ie8.css');
    }

    // Gulp task
    gulp.task('stylesFeatures', (done) => {
        gulp
            .src(paths)
            .pipe(gulp.dest('./src/assets/styles/'))
            .on('end', done);
    });

    // Return data
    return {
        taskName: 'stylesFeatures',
        devDependencies: [],
        bowerDependencies: []
    };
};
