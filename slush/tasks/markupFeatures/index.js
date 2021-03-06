'use strict';

const gulp = require('gulp');
const merge = require('merge-stream');

module.exports = (answers) => {

    const markupFeatures = answers.markupFeatures;
    const allowImagemin = (markupFeatures.indexOf('imagemin') >= 0);
    const allowIcons = (markupFeatures.indexOf('icons') >= 0);
    let devDependencies = [];

    if (allowImagemin === true) {
        devDependencies.push('gulp', 'gulp-imagemin', 'imagemin-pngquant');
    }

    // Files and folder locations
    const taskPath = __dirname + '/files/tools/**/*';
    const imagePath = __dirname + '/files/src/**/*';

    // Gulp task
    gulp.task('markupFeatures', (done) => {
        const streams = [];

        if (allowImagemin === true) {
            const copyTasks = gulp
                .src(taskPath)
                .pipe(gulp.dest('./tools/'));

            streams.push(copyTasks);
        }

        if (allowIcons === true) {
            const copySourceFiles = gulp
                .src(imagePath)
                .pipe(gulp.dest('./src/'));

            streams.push(copySourceFiles);
        }

        if (streams.length > 0) {
            return merge(streams);
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
