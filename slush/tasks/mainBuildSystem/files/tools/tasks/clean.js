const gulp = require('gulp');
const del = require('del');

/**
 * Cleaning tasks
 *
 * @task clean:*
 */
gulp.task('clean:dest', (done) => {
    return del(env.DIR_DEST, { force: env.UNSAFE_MODE });
});

gulp.task('clean:docs', (done) => {
    return del(env.DIR_DOCS, { force: env.UNSAFE_MODE });
});

gulp.task('clean:minify', (done) => {
    return del([
        env.DIR_DEST + '/assets/vendor'
        {% if jstBuildSystem != 'no' %}, env.DIR_DEST + '/assets/scripts/precompiledJst.js' {% endif %}
        {% if jstBuildSystem != 'no' %}, env.DIR_SRC + '/assets/scripts/precompiledJst.js' {% endif %}
    ], { force: env.UNSAFE_MODE });
});

gulp.task('clean:installed', (done) => {
    return del([
        'tools/node-*',
        env.DIR_BOWER,
        env.DIR_NPM
    ], { force: env.UNSAFE_MODE });
});
