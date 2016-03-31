'use strict';

const gulp = require('gulp');
const merge = require('merge-stream');
const template = require('gulp-template');

module.exports = (answers) => {

    const type = answers.stylesBuildSystem;
    let devDependencies = [];

    switch (type) {
        case 'none':
            devDependencies = ['gulp'];
            break;
        case 'sass':
            devDependencies = ['gulp', 'gulp-sass', 'gulp-autoprefixer', 'gulp-if'];
            break;
    }

    const sourcePath = __dirname + '/' + type + '/**/*';

    // Gulp task
    gulp.task('stylesBuildSystem', (done) => {
        const copySourceFiles = gulp
            .src(sourcePath)
            .pipe(gulp.dest('./'));

        return merge(copySourceFiles);
    });

    // Return data
    return {
        taskName: 'stylesBuildSystem',
        devDependencies: devDependencies,
        bowerDependencies: []
    }
};
