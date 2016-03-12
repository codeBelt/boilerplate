'use strict';

const gulp = require('gulp');

module.exports = (rootDirectory, answers) => {
    if (answers.scriptsAdditional.length === 0) { return null; }

    const scriptsAdditional = answers.scriptsAdditional;
    const bowerDependencies = [];

    if (scriptsAdditional.indexOf('jquery') >= 0) {
        bowerDependencies.push({'jquery': '*'});
    }

    if (scriptsAdditional.indexOf('modernizr') >= 0) {
        bowerDependencies.push({'modernizr': '*'});
    }

    const filesToCopy = [];
    const dictionary = {};
    dictionary['auto-replace']    = 'nerdery-auto-replace';
    dictionary['external-links']  = 'nerdery-external-links';
    dictionary['function-name']   = 'nerdery-function-name';
    dictionary['has-js']          = 'nerdery-has-js';
    dictionary['animation-frame'] = 'nerdery-request-animation-frame';

    scriptsAdditional.forEach((item) => {
        if (dictionary.hasOwnProperty(item) === true) {
            const obj = {};
            obj[item] = './tools/cache/' + dictionary[item];

            bowerDependencies.push(obj);
            filesToCopy.push(rootDirectory + '/templates/tools/cache/' + dictionary[item] + '/**/*');
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
