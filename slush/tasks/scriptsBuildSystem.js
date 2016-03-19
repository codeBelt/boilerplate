'use strict';

const gulp = require('gulp');
const merge = require('merge-stream');
const template = require('gulp-template');

module.exports = (rootDirectory, answers) => {

    const type = answers.scriptsBuildSystem;
    let devDependencies = [];
    let bowerDependencies = [];

    switch (type) {
        case 'none':
            devDependencies = ['gulp', 'merge-stream'];
            break;
        case 'babel':
            devDependencies = ['gulp', 'gulp-sourcemaps', 'browserify', 'babelify', 'vinyl-source-stream', 'babel-preset-es2015', 'merge-stream', 'babel-plugin-transform-class-properties', 'gulp-eslint'];
            break;
        case 'typescript':
            devDependencies = ['gulp', 'gulp-sourcemaps', 'tsify', 'browserify', 'babelify', 'vinyl-source-stream', 'babel-preset-es2015', 'merge-stream', 'babel-plugin-transform-class-properties'];
            break;
        case 'requirejs':
            devDependencies = ['gulp', 'requirejs', 'gulp-requirejs-optimize', 'merge-stream'];
            bowerDependencies = ['requirejs'];
            break;
    }

    const taskPath = rootDirectory + '/templates/tools/tasks/scriptsBuildSystem/' + type + '/buildScripts.js';
    const sourcePath = rootDirectory + '/templates/src/scriptsBuildSystem/' + type + '/**/*';

    // Gulp task
    gulp.task('scriptsBuildSystem', (done) => {
        const copyTasks = gulp
            .src(taskPath)
            .pipe(gulp.dest('./tools/tasks/'));

        const copySourceFiles = gulp
            .src(sourcePath)
            .pipe(template(answers))
            .pipe(gulp.dest('./src/'));

        return merge(copyTasks, copySourceFiles);
    });

    // Return data
    return {
        taskName: 'scriptsBuildSystem',
        devDependencies: devDependencies,
        bowerDependencies: bowerDependencies
    }
};
