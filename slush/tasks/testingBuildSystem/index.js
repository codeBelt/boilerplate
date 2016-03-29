'use strict';

const gulp = require('gulp');
const merge = require('merge-stream');

module.exports = (rootDirectory, answers) => {
    const testingBuildSystem = answers.testingBuildSystem;
    const allowAudit = (testingBuildSystem.indexOf('audit') >= 0);

    if (allowAudit === false) { return null; }

    const taskPath = [];

    let devDependencies = [];
    if (allowAudit === true) {
        devDependencies.push('gulp', 'npm-check-updates', 'cli-table');
        taskPath.push(rootDirectory + '/slush/tasks/auditScripts.js');
    }

    // Gulp task
    gulp.task('testingBuildSystem', (done) => {
        if (allowAudit === true) {
            gulp
                .src(taskPath)
                .pipe(gulp.dest('./tools/tasks/'))
                .on('end', done);
        }
    });

    // Return data
    return {
        taskName: 'testingBuildSystem',
        devDependencies: devDependencies,
        bowerDependencies: []
    };
};
