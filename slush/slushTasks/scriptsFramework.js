var gulp = require('gulp');

module.exports = function (rootDirectory, answers) {
    if (answers.scriptsFramework === 'none') { return null; }

    var frameworkType = answers.scriptsFramework;
    var bowerDependencies = [];

    switch (frameworkType) {
        case 'structurejs':
            bowerDependencies.push({"structurejs": "*"});
            bowerDependencies.push({"jquery": "*"});
            bowerDependencies.push({"handlebars": "*"});
            break;
    }

    gulp.task('scriptsFramework', function(done) {
        done();
    });

    return {
        taskName: 'scriptsFramework',
        devDependencies: [],
        bowerDependencies: bowerDependencies
    };
};