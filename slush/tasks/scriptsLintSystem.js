'use strict';

const gulp = require('gulp');
const merge = require('merge-stream');

module.exports = (rootDirectory, answers) => {

    const type = answers.scriptsBuildSystem;
    let devDependencies = [];
    let bowerDependencies = [];

    switch (type) {
        case 'none':
            devDependencies = ['gulp', 'gulp-jslint'];
            break;
        case 'babel':
            devDependencies = ['gulp', 'gulp-eslint', 'babel-eslint', 'eslint-plugin-react'];
            break;
        case 'typescript':
            devDependencies = ['gulp', 'gulp-tslint'];
            break;
        case 'requirejs':
            devDependencies = ['gulp', 'gulp-jslint'];
            break;
    }

    const taskPath = rootDirectory + '/templates/tools/tasks/scriptsLintSystem/' + type + '/lintScripts.js';
    const sourcePath = rootDirectory + '/templates/scriptsLintSystem/' + type + '/**/{*,.*}';

    // Gulp task
    gulp.task('scriptsLintSystem', (done) => {
        const copyTasks = gulp
            .src(taskPath)
            .pipe(gulp.dest('./tools/tasks/'));

        const copySourceFiles = gulp
            .src(sourcePath)
            .pipe(gulp.dest('./'));

        return merge(copyTasks, copySourceFiles);
    });

    // Return data
    return {
        taskName: 'scriptsLintSystem',
        devDependencies: devDependencies,
        bowerDependencies: bowerDependencies
    }
};
