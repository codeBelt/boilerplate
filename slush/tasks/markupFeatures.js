'use strict';

const gulp = require('gulp');
const merge = require('merge-stream');

module.exports = (rootDirectory, answers) => {

    const markupFeatures = answers.markupFeatures;
    const allowImagemin = (markupFeatures.indexOf('imagemin') !== -1);
    let devDependencies = [];

    if (allowImagemin === true) {
        devDependencies.push('gulp', 'gulp-imagemin', 'imagemin-pngquant');
    }

    // Files and folder locations
    const taskPath = rootDirectory + '/templates/tools/tasks/markupFeatures/optimizeStatic.js';

    // Gulp task
    gulp.task('markupFeatures', (done) => {
        if (allowImagemin === true) {
            const copyTasks = gulp
                .src(taskPath)
                .pipe(gulp.dest('./tools/tasks/'));

            return merge(copyTasks);
        } else {
            done();
        }
    });

    // Return data
    return {
        taskName: 'markupFeatures',
        devDependencies: devDependencies,
        bowerDependencies: []
    };
};