var gulp = require('gulp');
var merge = require('merge-stream');

module.exports = function (rootDirectory, answers) {

    var type = answers.stylesBuildSystem;
    var devDependencies = [];

    switch (type) {
        case 'none':
            devDependencies = ['gulp'];
            break;
        case 'sass':
            devDependencies = ['gulp', 'gulp-sass', 'gulp-autoprefixer'];
            break;
    }

    var taskPath = rootDirectory + '/templates/tools/tasks/stylesBuildSystem/' + type + '/buildScripts.js';
    var sourcePath = rootDirectory + '/templates/src/stylesBuildSystem/' + type + '/**/*';

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