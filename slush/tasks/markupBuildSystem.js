'use strict';

const gulp = require('gulp');
const merge = require('merge-stream');

module.exports = (rootDirectory, answers) => {

    const type = answers.markupBuildSystem;
    let devDependencies = [];

    switch (type) {
        case 'none':
            devDependencies = ['gulp'];
            break;
        case 'includes':
            devDependencies = ['gulp', 'gulp-file-include'];
            break;
        case 'handlebars':
            devDependencies = ['gulp', 'gulp-hb', 'gulp-rename', 'gulp-replace', 'gulp-prettify'];
            break;
    }

    // Files and folder locations
    const taskPath = rootDirectory + '/templates/tools/tasks/markupBuildSystem/' + type + '/buildMarkup.js';
    const sourcePath = rootDirectory + '/templates/src/markupBuildSystem/' + type + '/**/*';

    // Gulp task
    gulp.task('markupBuildSystem', (done) => {
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
        taskName: 'markupBuildSystem',
        devDependencies: devDependencies,
        bowerDependencies: []
    };
};
