'use strict';

const gulp = require('gulp');
const template = require('gulp-template');

module.exports = (answers) => {
    // Files and folder locations
    const files = __dirname + '/files/**/{*,.*}';

    // Gulp task
    gulp.task('staticBuildSystem', (done) => {
        gulp
            .src(files)
            .pipe(template(answers))
            .pipe(gulp.dest('./'))
            .on('end', done);
    });

    // Return data
    return {
        taskName: 'staticBuildSystem',
        devDependencies: [],
        bowerDependencies: []
    };
};
