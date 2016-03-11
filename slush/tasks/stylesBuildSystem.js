'use strict';

const gulp = require('gulp');
const merge = require('merge-stream');

module.exports = (rootDirectory, answers) => {

    const type = answers.stylesBuildSystem;
    let devDependencies = [];

    switch (type) {
        case 'none':
            devDependencies = ['gulp'];
            break;
        case 'sass':
            devDependencies = ['gulp', 'gulp-sass', 'gulp-autoprefixer'];
            break;
    }

    const taskPath = rootDirectory + '/templates/tools/tasks/stylesBuildSystem/' + type + '/buildStyles.js';
    const sourcePath = rootDirectory + '/templates/src/stylesBuildSystem/' + type + '/**/*';

    // Gulp task
    gulp.task('stylesBuildSystem', (done) => {
        const copyTasks = gulp
            .src(taskPath)
            .pipe(gulp.dest('./tools/tasks/'));

        const copySourceFiles = gulp
            .src(sourcePath)
            .pipe(gulp.dest('./src/'));

        return merge(copyTasks, copySourceFiles);
    });

    // Return data
    return {
        taskName: 'stylesBuildSystem',
        devDependencies: devDependencies,
        bowerDependencies: []
    }
};
