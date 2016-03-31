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

    const sourcePath = __dirname + '/' + type + '/**/{*,.*}';

    // Gulp task
    gulp.task('scriptsLintSystem', (done) => {
        const copySourceFiles = gulp
            .src(sourcePath)
            .pipe(template(answers))
            .pipe(gulp.dest('./'));

        return merge(copySourceFiles);
    });

    // Return data
    return {
        taskName: 'scriptsLintSystem',
        devDependencies: devDependencies,
        bowerDependencies: bowerDependencies
    }
};
