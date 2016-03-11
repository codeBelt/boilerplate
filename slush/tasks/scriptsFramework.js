'use strict';

const gulp = require('gulp');

module.exports = (rootDirectory, answers) => {
    if (answers.scriptsFramework === 'none') { return null; }

    const frameworkType = answers.scriptsFramework;
    const bowerDependencies = [];

    switch (frameworkType) {
        case 'structurejs':
            bowerDependencies.push({'structurejs': '*'}, {'jquery': '*'}, {'handlebars': '*'});
            break;
        case 'reactjs':
            break;
        case 'angular':
            break;
    }

    // Gulp task
    gulp.task('scriptsFramework', (done) => {
        done();
    });

    // Return data
    return {
        taskName: 'scriptsFramework',
        devDependencies: [],
        bowerDependencies: bowerDependencies
    }
};
