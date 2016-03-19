'use strict';

const gulp = require('gulp');
const merge = require('merge-stream');

module.exports = (rootDirectory, answers) => {

    const type = answers.scriptsBuildSystem;
    let devDependencies = [];
    let bowerDependencies = [];

    switch (type) {
        case 'none':
            devDependencies = ['gulp', 'js-eslint'];
            break;
        case 'babel':
            devDependencies = ['gulp', 'gulp-eslint'];
            break;
        case 'typescript':
            devDependencies = ['gulp', 'gulp-tslint'];
            break;
        case 'requirejs':
            devDependencies = ['gulp', 'js-eslint'];
            break;
    }

    const taskPath = rootDirectory + '/templates/tools/tasks/scriptsLintSystem/' + type + '/lintScripts.js';
    const sourcePath = rootDirectory + '/templates/src/scriptsLintSystem/' + type + '/**/*';

    // Gulp task
    gulp.task('scriptsLintSystem', (done) => {
        const copyTasks = gulp
            .src(taskPath)
            .pipe(gulp.dest('./tools/tasks/'));
        //
        //const copySourceFiles = gulp
        //    .src(sourcePath)
        //    .pipe(template(answers))
        //    .pipe(gulp.dest('./src/'));
        //
        return merge(copyTasks);
    });

    // Return data
    return {
        taskName: 'scriptsLintSystem',
        devDependencies: devDependencies,
        bowerDependencies: bowerDependencies
    }
};
