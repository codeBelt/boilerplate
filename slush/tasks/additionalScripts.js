'use strict';

const gulp = require('gulp');

module.exports = (rootDirectory, answers) => {
    if (answers.additionalScripts.length === 0) { return null; }

    const scriptsFramework = answers.scriptsFramework;
    const additionalScripts = answers.additionalScripts;
    const basePath = rootDirectory + '/templates/tools/cache';
    const bowerDependencies = [];

    const addDemoFiles = (additionalScripts.indexOf('demo') !== -1);

    if (additionalScripts.indexOf('jquery') !== -1) {
        bowerDependencies.push({"jquery": "*"});
    }

    if (additionalScripts.indexOf('modernizr') !== -1) {
        bowerDependencies.push({"modernizr": "*"});
    }

    const filesToCopy = [];
    const dictionary = {};
    dictionary['auto-replace']    = 'nerdery-auto-replace';
    dictionary['external-links']  = 'nerdery-external-links';
    dictionary['function-name']   = 'nerdery-function-name';
    dictionary['has-js']          = 'nerdery-has-js';
    dictionary['animation-frame'] = 'nerdery-request-animation-frame';

    additionalScripts.forEach((item) => {
        if (dictionary.hasOwnProperty(item) === true) {
            const obj = {};
            obj[item] = './tools/cache/' + dictionary[item];

            bowerDependencies.push(obj);
            filesToCopy.push(rootDirectory + '/templates/tools/cache/' + dictionary[item] + '/**/*');
        }
    });

    gulp.task('additionalScripts', (done) => {
        gulp
            .src(filesToCopy,  { base: rootDirectory + '/templates' })
            .pipe(gulp.dest('./'))
            .on('end', done);
    });

    return {
        taskName: 'additionalScripts',
        devDependencies: [],
        bowerDependencies: bowerDependencies
    }
};
