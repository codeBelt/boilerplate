var gulp = require('gulp');
var merge = require('merge-stream');

module.exports = function (rootDirectory, answers) {

    var type = answers.markupBuildSystem;
    var devDependencies = [];

    switch (type) {
        case 'none':
            devDependencies = [];
            break;
        case 'includes':
            devDependencies = [];
            break;
        case 'handlebars':
            devDependencies = ['gulp-hb'];
            break;
    }

    var taskPath = rootDirectory + '/templates/tools/tasks/markupBuildSystem/' + type + '/buildMarkup.js';
    var sourcePath = rootDirectory + '/templates/src/markupBuildSystem/' + type + '/**/*';

    gulp.task('markupBuildSystem', function(done) {
        var copyTasks = gulp
            .src(taskPath)
            .pipe(gulp.dest('./tools/tasks/'));

        var copySourceFiles = gulp
            .src(sourcePath)
            .pipe(gulp.dest('./src/'));

        return merge(copyTasks, copySourceFiles);
    });

    return {
        taskName: 'markupBuildSystem',
        devDependencies: devDependencies,
        bowerDependencies: []
    };
};