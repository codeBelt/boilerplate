var gulp = require('gulp');
var merge = require('merge-stream');

module.exports = function (rootDirectory, answers) {

    var markupType = answers.markupBuildSystem;
    var devDependencies = [];

    switch (markupType) {
        case 'none':
            devDependencies = [];
            break;
        case 'includes':
            devDependencies = [];
            break;
        case 'handlebars':
            devDependencies = [];
            break;
    }

    var taskPath = rootDirectory + '/templates/tools/tasks/markupBuildSystem/' + markupType + '/buildMarkup.js';
    var sourcePath = rootDirectory + '/templates/src/markupBuildSystem/' + markupType + '/**/*';

    gulp.task('markupBuildSystem', function(done) {
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
        taskName: 'markupBuildSystem',
        devDependencies: devDependencies,
        bowerDependencies: []
    };
};