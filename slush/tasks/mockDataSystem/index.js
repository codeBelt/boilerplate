'use strict';

const gulp = require('gulp');
const merge = require('merge-stream');
const template = require('gulp-template');
const prettify = require('gulp-prettify');
const replace = require('gulp-replace');

module.exports = (answers) => {
    if (answers.mockDataSystem === 'no') { return null; }

    const type = answers.mockDataSystem;
    let devDependencies = [];

    switch (type) {
        case 'jsonServer':
            devDependencies = ['faker', 'lodash'];
            break;
    }

    // Files and folder locations
    const path = __dirname + '/' + type + '/**/*';

    // Gulp task
    gulp.task('mockDataSystem', (done) => {
        return gulp
            .src(path)
            .pipe(gulp.dest('./'));
    });

    // Return data
    return {
        taskName: 'mockDataSystem',
        devDependencies: devDependencies,
        bowerDependencies: []
    };
};
