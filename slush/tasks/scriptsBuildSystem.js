'use strict';

const gulp = require('gulp');
const merge = require('merge-stream');

module.exports = (rootDirectory, answers) => {

    const type = answers.scriptsBuildSystem;
    let devDependencies = [];

    switch (type) {
        case 'none':
            devDependencies = ['gulp'];
            break;
        case 'babel':
            devDependencies = ['gulp', 'gulp-sourcemaps', 'browserify', 'babelify', 'vinyl-source-stream', 'babel-preset-es2015'];
            break;
        case 'typescript':
            devDependencies = ['gulp', 'gulp-sourcemaps', 'tsify', 'browserify', 'babelify', 'vinyl-source-stream', 'babel-preset-es2015'];
            break;
        case 'requirejs':
            devDependencies = ['gulp', 'gulp-requirejs', 'requirejs'];
            break;
    }

    const taskPath = rootDirectory + '/templates/tools/tasks/scriptsBuildSystem/' + type + '/buildScripts.js';
    const sourcePath = rootDirectory + '/templates/src/scriptsBuildSystem/' + type + '/**/*';

    gulp.task('scriptsBuildSystem', (done) => {
        const copyTasks = gulp
            .src(taskPath)
            .pipe(gulp.dest('./tools/tasks/'));

        const copySourceFiles = gulp
            .src(sourcePath)
            .pipe(gulp.dest('./src/'));

        return merge(copyTasks, copySourceFiles);
    });

    // List dependencies for this package
    return {
        taskName: 'scriptsBuildSystem',
        devDependencies: devDependencies,
        bowerDependencies: []
    }
};
