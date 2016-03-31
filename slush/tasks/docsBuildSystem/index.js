'use strict';

const gulp = require('gulp');

module.exports = (answers) => {

    let devDependencies = ['gulp', 'gulp-yuidoc'];
    let bowerDependencies = [];

    // Files and folder locations
    const taskPath = __dirname + '/files/**/*';

    // Gulp task
    gulp.task('docsBuildSystem', (done) => {
        const copyTasks = gulp
            .src(taskPath)
            .pipe(gulp.dest('./'))
            .on('end', done);
    });

    // Return data
    return {
        taskName: 'docsBuildSystem',
        devDependencies: devDependencies,
        bowerDependencies: bowerDependencies
    };
};
