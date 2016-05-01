'use strict';

const gulp = require('gulp');
const merge = require('merge-stream');
const template = require('gulp-template');

module.exports = (answers) => {

    const wasDemoChoosen = answers.demoBuildSystem === 'yes';

    const type = answers.scriptsBuildSystem;
    let devDependencies = [];
    let bowerDependencies = [];

    switch (type) {
        case 'none':
            devDependencies = ['gulp', 'merge-stream'];
            break;
        case 'babel':
            devDependencies = ['gulp', 'gulp-sourcemaps', 'browserify', 'browserify-shim', 'babelify', 'vinyl-source-stream', 'babel-preset-es2015', 'merge-stream', 'aliasify', 'babel-plugin-transform-async-to-generator', 'babel-plugin-transform-class-properties', 'babel-plugin-transform-runtime'];
            break;
        case 'typescript':
            devDependencies = ['gulp', 'gulp-sourcemaps', 'tsify', 'browserify', 'browserify-shim', 'babelify', 'aliasify', 'vinyl-source-stream', 'babel-preset-es2015', 'merge-stream', 'babel-plugin-transform-async-to-generator', 'babel-plugin-transform-class-properties', 'babel-plugin-transform-runtime'];
            break;
        case 'requirejs':
            devDependencies = ['gulp', 'requirejs', 'gulp-requirejs-optimize', 'merge-stream'];
            bowerDependencies = ['requirejs', 'jquery'];
            break;
    }

    const taskPath = __dirname + '/' + type + '/tools/**/*';
    const sourcePath = __dirname + '/' + type + '/src/**/*';

    // Gulp task
    gulp.task('scriptsBuildSystem', (done) => {
        const tasks = [];

        const copyTasks = gulp
            .src(taskPath)
            .pipe(gulp.dest('./tools/'));

        tasks.push(copyTasks);

        if (wasDemoChoosen === false) {
            const copySourceFiles = gulp
                .src(sourcePath)
                .pipe(template(answers))
                .pipe(gulp.dest('./src/'));

            tasks.push(copySourceFiles);
        }

        return merge(...tasks);
    });

    // Return data
    return {
        taskName: 'scriptsBuildSystem',
        devDependencies: devDependencies,
        bowerDependencies: bowerDependencies
    }
};
