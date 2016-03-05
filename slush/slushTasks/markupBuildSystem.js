var gulp = require('gulp');

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

    var basePath = rootDirectory + '/templates/tools/tasks/markupBuildSystem';
    basePath += '/' + markupType + '/buildMarkup.js';

    gulp.task('markupBuildSystem', function(done) {
        gulp.src(basePath)
            .pipe(gulp.dest('./tools/tasks/'))
            .on('end', function () {
                done();
            });
    });

    // List dependencies for this package
    return {
        taskName: 'markupBuildSystem',
        devDependencies: devDependencies,
        bowerDependencies: []
    };
};