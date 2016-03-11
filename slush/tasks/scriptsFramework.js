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

    gulp.task('scriptsFramework', (done) => {
        done();
    });

    return {
        taskName: 'scriptsFramework',
        devDependencies: [],
        bowerDependencies: bowerDependencies
    }
};
