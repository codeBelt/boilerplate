'use strict';

const gulp = require('gulp');
const merge = require('merge-stream');
const nunjucks = require('gulp-nunjucks');

module.exports = (answers) => {

    const type = answers.stylesBuildSystem;
    let devDependencies = [];

    switch (type) {
        case 'none':
            devDependencies = ['gulp', 'gulp-autoprefixer', 'gulp-if'];
            break;
        case 'sass':
            devDependencies = ['gulp', 'gulp-sass', 'gulp-autoprefixer', 'gulp-if', 'gulp-plumber'];
            break;
        case 'postCSS':
            devDependencies = ['gulp', 'gulp-postcss', 'postcss-import', 'postcss-cssnext', 'postcss-discard-comments', 'postcss-apply', 'gulp-sourcemaps'];
            break;
    }

    const sourcePath = __dirname + '/' + type + '/**/*';

    // Gulp task
    gulp.task('stylesBuildSystem', (done) => {
        const copySourceFiles = gulp
            .src(sourcePath)
            .pipe(nunjucks.compile(answers))
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
