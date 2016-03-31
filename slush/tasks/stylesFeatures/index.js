'use strict';

const gulp = require('gulp');

module.exports = (answers) => {
    if (answers.stylesFeatures.length === 0) { return null; }

    const stylesFeatures = answers.stylesFeatures;
    const paths = [];

    if (stylesFeatures.indexOf('print') >= 0) {
        paths.push(__dirname + '/files/src/assets/styles/print.css');
    }

    if (stylesFeatures.indexOf('ie9') >= 0) {
        paths.push(__dirname + '/files/src/assets/styles/ie9.css');
    }

    if (stylesFeatures.indexOf('ie8') >= 0) {
        paths.push(__dirname + '/files/src/assets/styles/ie8.css');
    }

    // Gulp task
    gulp.task('stylesFeatures', (done) => {
        gulp
            .src(paths, {base: __dirname + '/files'})
            .pipe(gulp.dest('./'))
            .on('end', done);
    });

    // Return data
    return {
        taskName: 'stylesFeatures',
        devDependencies: [],
        bowerDependencies: []
    };
};
