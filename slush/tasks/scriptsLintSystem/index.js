'use strict';

const gulp = require('gulp');
const merge = require('merge-stream');
const template = require('gulp-template');

module.exports = (answers) => {

    const type = answers.scriptsBuildSystem;
    let devDependencies = [];
    let bowerDependencies = [];

    switch (type) {
        case 'none':
            devDependencies = ['gulp', 'gulp-jshint' ,'jshint'];
            break;
        case 'babel':
            devDependencies = ['gulp', 'gulp-eslint', 'babel-eslint', 'eslint-plugin-react'];
            break;
        case 'typescript':
            devDependencies = ['gulp', 'gulp-tslint', 'tslint', 'typescript'];
            break;
        case 'requirejs':
            devDependencies = ['gulp', 'gulp-jshint', 'jshint'];
            break;
    }

    const taskPath = __dirname + '/slush/tasks/scriptsLintSystem/' + type + '/lintScripts.js';
    const sourcePath = __dirname + '/templates/scriptsLintSystem/' + type + '/**/{*,.*}';

    // Gulp task
    gulp.task('scriptsLintSystem', (done) => {
        const copyTasks = gulp
            .src(taskPath)
            .pipe(gulp.dest('./tools/tasks/'));

        const copySourceFiles = gulp
            .src(sourcePath)
            .pipe(template(answers))
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
