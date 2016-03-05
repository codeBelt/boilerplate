var gulp = require('gulp');
var merge = require('merge-stream');

module.exports = function (rootDirectory, answers) {

    var styleType = answers.stylesBuildSystem;
    var devDependencies = [];

    switch (styleType) {
        case 'none':
            devDependencies = [];
            break;
        case 'sass':
            devDependencies = [];
            break;
    }

    var taskPath = rootDirectory + '/templates/tools/tasks/stylesBuildSystem/' + styleType + '/buildScripts.js';
    var sourcePath = rootDirectory + '/templates/src/stylesBuildSystem/' + styleType + '/**/*';

    gulp.task('stylesBuildSystem', function(done) {
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
        taskName: 'stylesBuildSystem',
        devDependencies: devDependencies,
        bowerDependencies: []
    };
};