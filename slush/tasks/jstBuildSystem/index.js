'use strict';

const gulp = require('gulp');
const merge = require('merge-stream');

module.exports = (answers) => {

    const type = answers.jstBuildSystem;
    let devDependencies = [];
    let bowerDependencies = [];

    switch (type) {
        case 'handlebars':
            devDependencies = ['gulp', 'gulp-handlebars', 'handlebars', 'gulp-wrap', 'gulp-declare', 'gulp-concat', 'merge-stream'];
            bowerDependencies.push('handlebars');
            break;
    }

    const sourcePath = __dirname + '/' + type + '/**/*';

    // Gulp task
    gulp.task('jstBuildSystem', (done) => {
        const copySourceFiles = gulp
            .src(sourcePath)
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
