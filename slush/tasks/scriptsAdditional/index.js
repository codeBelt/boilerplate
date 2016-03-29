'use strict';

const gulp = require('gulp');

module.exports = (rootDirectory, answers) => {
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
            filesToCopy.push(rootDirectory + '/templates/tools/cache/' + item + '/**/*');
        }
    });

    // Gulp task
    gulp.task('scriptsAdditional', (done) => {
        gulp
            .src(filesToCopy,  { base: rootDirectory + '/templates' })
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
