'use strict';

const gulp = require('gulp');
const merge = require('merge-stream');

module.exports = (rootDirectory, answers) => {

    const type = answers.precompileJst;
    let devDependencies = [];
    let bowerDependencies = [];

    switch (type) {
        case 'handlebars':
            devDependencies = ['gulp', 'gulp-handlebars', 'handlebars', 'gulp-wrap', 'gulp-declare', 'gulp-concat'];
            bowerDependencies.push({'handlebars': '*'});
            break;
    }

    const taskPath = rootDirectory + '/templates/tools/tasks/precompileJst/' + type + '/precompileJst.js';
    const sourcePath = rootDirectory + '/templates/src/precompileJst/' + type + '/**/*';


    // Gulp task
    gulp.task('precompileJst', (done) => {
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
        taskName: 'precompileJst',
        devDependencies: devDependencies,
        bowerDependencies: bowerDependencies
    }
};
