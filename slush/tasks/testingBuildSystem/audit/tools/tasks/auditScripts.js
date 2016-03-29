const gulp = require('gulp');
const ncu = require('npm-check-updates');
const Table = require('cli-table');

/**
 * Checks npm modules and generates a table of old modules.
 *
 * @method checkModules
 * @param type {string} Either 'npm' or 'bower'.
 * @private
 */
const checkModules = (type) => {
    return ncu.run({
            packageManager: type
        })
        .then((upgraded) => {

            const keys = Object.keys(upgraded);

            if (keys.length === 0) {
                console.log('none');
            } else {
                const table = new Table({
                    head: [`${type} name`, 'latest version']
                });

                Object.keys(upgraded).forEach((name) => {
                    table.push([name, upgraded[name]]);
                });

                console.log(table.toString());
            }
        });
};

gulp.task('audit', (done) => {
    console.log('NPM dependencies that should be upgraded:');

    checkModules('npm')
        .then((upgraded) => {

            console.log('Bower dependencies that should be upgraded:');

            checkModules('bower')
                .then(done);
        });
});
