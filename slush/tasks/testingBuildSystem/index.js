'use strict';

const gulp = require('gulp');
const merge = require('merge-stream');

module.exports = (answers) => {
    const testingBuildSystem = answers.testingBuildSystem;
    const allowAudit = (testingBuildSystem.indexOf('audit') >= 0);
    const allowUnitTesting = (testingBuildSystem.indexOf('testing') >= 0);

    if (allowAudit === false && allowUnitTesting === false) { return null; }

    const taskPath = [];
    const devDependencies = [];

    if (allowAudit === true) {
        devDependencies.push('gulp', 'npm-check-updates', 'cli-table');
        taskPath.push(__dirname + '/audit/**/{*.*}');
    }

    if (allowUnitTesting === true) {
        devDependencies.push('gulp', 'jest-cli', 'gulp-jest-iojs');
        taskPath.push(__dirname + '/jest/**/*');
    }

    // Gulp task
    gulp.task('testingBuildSystem', (done) => {
        const tasks = [];

        if (allowAudit === true) {
            const audit = gulp
                .src(taskPath)
                .pipe(gulp.dest('./'));

            tasks.push(audit);
        }

        if (allowUnitTesting === true) {
            const unitTest = gulp
                .src(taskPath)
                .pipe(gulp.dest('./'));

            tasks.push(unitTest);
        }

        return merge(...tasks);
    });

    // Return data
    return {
        taskName: 'testingBuildSystem',
        devDependencies: devDependencies,
        bowerDependencies: []
    };
};
