'use strict';

const gulp = require('gulp');
const merge = require('merge-stream');

module.exports = (answers) => {

    let devDependencies = ['gulp', 'gulp-yuidoc'];
    let bowerDependencies = [];

    // Files and folder locations
    const filesToCopy = [
        __dirname + '/templates/tools/cache/yuidoc-friendly-theme/**/*'
    ];

    const taskPath = __dirname + '/slush/tasks/docsBuildSystem/buildDocs.js';

    // Gulp task
    gulp.task('docsBuildSystem', (done) => {
        const copySourceFiles = gulp
            .src(filesToCopy,  { base: __dirname + '/templates' })
            .pipe(gulp.dest('./'));

        const copyTasks = gulp
            .src(taskPath)
            .pipe(gulp.dest('./tools/tasks/'));

        return merge(copyTasks, copySourceFiles);
    });

    // Return data
    return {
        taskName: 'docsBuildSystem',
        devDependencies: devDependencies,
        bowerDependencies: bowerDependencies
    };
};
