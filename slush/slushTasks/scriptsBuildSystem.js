var gulp = require('gulp');
var merge = require('merge-stream');

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

    var taskPath = rootDirectory + '/templates/tools/tasks/scriptsBuildSystem/' + scriptType + '/buildScripts.js';
    var sourcePath = rootDirectory + '/templates/src/scriptsBuildSystem/' + scriptType + '/**/*';

    gulp.task('scriptsBuildSystem', function(done) {
        var copyTasks = gulp
            .src(taskPath)
            .pipe(gulp.dest('./tools/tasks/'));

        var copySourceFiles = gulp
            .src(sourcePath)
            .pipe(gulp.dest('./src/'));

        return merge(copyTasks, copySourceFiles);
    });

    // List dependencies for this package
    return {
        taskName: 'scriptsBuildSystem',
        devDependencies: devDependencies,
        bowerDependencies: []
    };
};