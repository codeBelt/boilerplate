'use strict';

const gulp = require('gulp');

module.exports = (answers) => {
    if (answers.scriptsAdditional.length === 0) { return null; }

    const scriptsAdditional = answers.scriptsAdditional;
    const bowerDependencies = [];

    if (scriptsAdditional.indexOf('jquery') >= 0) {
        bowerDependencies.push('jquery');
    }

    if (scriptsAdditional.indexOf('modernizr') >= 0) {
        bowerDependencies.push('modernizr');
    }

    const filesToCopy = [];
    scriptsAdditional.forEach((item) => {
        if (item.includes('nerdery-') === true) {
            bowerDependencies.push(item);
            filesToCopy.push(__dirname + '/files/tools/cache/' + item + '/**/*');
        }
    });

    // Gulp task
    gulp.task('scriptsAdditional', (done) => {
        gulp
            .src(filesToCopy,  { base: __dirname + '/files' })
            .pipe(gulp.dest('./'))
            .on('end', done);
    });

    // Return data
    return {
        taskName: 'scriptsAdditional',
        devDependencies: [],
        bowerDependencies: bowerDependencies
    }
};
