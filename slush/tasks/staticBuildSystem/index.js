'use strict';

const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks');

module.exports = (answers) => {
    // Files and folder locations
    const files = __dirname + '/files/**/{*,.*}';

    // Gulp task
    gulp.task('staticBuildSystem', (done) => {
        gulp
            .src(files)
            .pipe(nunjucks.compile(answers))
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
