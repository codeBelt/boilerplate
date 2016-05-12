'use strict';

const gulp = require('gulp');
const merge = require('merge-stream');
const replace = require('gulp-replace');

module.exports = (answers) => {

    const isRequireJS = answers.scriptsBuildSystem === 'requirejs';
    const jstType = answers.jstBuildSystem;
    let devDependencies = [];
    let bowerDependencies = [];

    switch (jstType) {
        case 'handlebars':
            devDependencies = ['gulp', 'gulp-handlebars', 'handlebars', 'gulp-wrap', 'gulp-declare', 'gulp-concat', 'merge-stream', 'gulp-if', 'slash'];
            bowerDependencies.push('handlebars');
            break;
    }

    const sourcePath = __dirname + '/' + jstType + '/**/*';

    // Gulp task
    gulp.task('jstBuildSystem', (done) => {
        const copySourceFiles = gulp
            .src(sourcePath)
            .pipe(replace(/@@isAMD/g, isRequireJS))
            .pipe(gulp.dest('./'));

        return merge(copySourceFiles);
    });

    // Return data
    return {
        taskName: 'jstBuildSystem',
        devDependencies: devDependencies,
        bowerDependencies: bowerDependencies
    }
};
