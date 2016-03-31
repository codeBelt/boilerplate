'use strict';

const gulp = require('gulp');
const merge = require('merge-stream');

module.exports = (answers) => {

    const type = answers.precompileJst;
    let devDependencies = [];
    let bowerDependencies = [];

    switch (type) {
        case 'handlebars':
            devDependencies = ['gulp', 'gulp-handlebars', 'handlebars', 'gulp-wrap', 'gulp-declare', 'gulp-concat'];
            bowerDependencies.push('handlebars');
            break;
    }

    const sourcePath = __dirname + '/' + type + '/**/*';

    // Gulp task
    gulp.task('precompileJst', (done) => {
        const copySourceFiles = gulp
            .src(sourcePath)
            .pipe(gulp.dest('./'));

        return merge(copySourceFiles);
    });

    // Return data
    return {
        taskName: 'precompileJst',
        devDependencies: devDependencies,
        bowerDependencies: bowerDependencies
    }
};
