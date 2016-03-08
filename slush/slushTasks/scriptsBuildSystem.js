var gulp = require('gulp');
var merge = require('merge-stream');

module.exports = function (rootDirectory, answers) {

    var type = answers.scriptsBuildSystem;
    var devDependencies = [];

    switch (type) {
        case 'none':
            devDependencies = [];
            break;
        case 'babel':
            devDependencies = [];
            break;
        case 'typescript':
            devDependencies = ['gulp', 'tsify', 'browserify', 'babelify', 'vinyl-source-stream', 'babel-preset-es2015'];
            break;
        case 'requirejs':
            devDependencies = [];
            break;
    }

    var taskPath = rootDirectory + '/templates/tools/tasks/scriptsBuildSystem/' + type + '/buildScripts.js';
    var sourcePath = rootDirectory + '/templates/src/scriptsBuildSystem/' + type + '/**/*';

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