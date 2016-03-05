var gulp = require('gulp');
var conflict = require('gulp-conflict');

module.exports = function (rootDirectory, answers) {

    var scriptType = answers.scriptsBuildSystem;
    var devDependencies = [];

    switch (scriptType) {
        case 'none':
            devDependencies = [];
            break;
        case 'babel':
            devDependencies = [];
            break;
        case 'typescript':
            devDependencies = [];
            break;
        case 'requirejs':
            devDependencies = [];
            break;
    }

    var basePath = rootDirectory + '/templates/tools/tasks/scriptsBuildSystem';
    basePath += '/' + scriptType + '/buildScripts.js';

    gulp.task('scriptsBuildSystem', function(done) {
        gulp.src(basePath)
            .pipe(gulp.dest('./tools/tasks/'))
            .on('end', function () {
                done();
            });
    });

    // List dependencies for this package
    return {
        taskName: 'scriptsBuildSystem',
        devDependencies: devDependencies,
        bowerDependencies: []
    };
};