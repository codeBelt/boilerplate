'use strict';

const gulp = require('gulp');
const merge = require('merge-stream');
const template = require('gulp-template');

module.exports = (answers) => {

    const type = answers.stylesBuildSystem;
    let devDependencies = [];

    switch (type) {
        case 'none':
            devDependencies = ['gulp'];
            break;
        case 'sass':
            devDependencies = ['gulp', 'gulp-sass', 'gulp-autoprefixer', 'gulp-if'];
            break;
    }

    const taskPath = __dirname + '/slush/tasks/stylesBuildSystem/' + type + '/buildStyles.js';
    const sourcePath = __dirname + '/templates/src/stylesBuildSystem/' + type + '/**/*';

    // Gulp task
    gulp.task('stylesBuildSystem', (done) => {
        const copyTasks = gulp
            .src(taskPath)
            .pipe(template(answers))
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