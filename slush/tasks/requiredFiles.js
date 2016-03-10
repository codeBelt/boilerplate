'use strict';

const gulp = require('gulp');

module.exports = (rootDirectory, answers) => {

    gulp.task('requiredFiles', (done) => {
        const paths = [
            rootDirectory + '/templates/**',
            rootDirectory + '/templates/.*',
            '!' + rootDirectory + '/templates/src/**/*',
            '!' + rootDirectory + '/templates/tools/cache/**/*',
            '!' + rootDirectory + '/templates/tools/tasks/**/*',
            '!' + rootDirectory + '/templates/package.json'
        ];

        gulp.src(paths)
            .pipe(gulp.dest('./'))
            .on('end', done);
    });

    return {
        taskName: 'requiredFiles',
        devDependencies: [
            'gulp',
            'gulp-util',
            'gulp-load-plugins',
            'require-dir',
            'run-sequence',
            'browser-sync'
        ],
        bowerDependencies: []
    }
};
