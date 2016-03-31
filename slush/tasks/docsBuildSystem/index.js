'use strict';

const gulp = require('gulp');
const merge = require('merge-stream');

module.exports = (answers) => {

    let devDependencies = ['gulp', 'gulp-yuidoc'];
    let bowerDependencies = [];

    // Files and folder locations
    const taskPath = __dirname + '/files/**/*';

    // Gulp task
    gulp.task('docsBuildSystem', (done) => {
        const copyTasks = gulp
            .src(taskPath)
            .pipe(gulp.dest('./'));

        return merge(copyTasks);
    });

    // Return data
    return {
        taskName: 'docsBuildSystem',
        devDependencies: devDependencies,
        bowerDependencies: bowerDependencies
    };
};
