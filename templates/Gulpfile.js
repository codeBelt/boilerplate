const gulp = require('gulp');
const requireDir = require('require-dir');
const runSequence = require('run-sequence');
const argv = require('yargs').argv;
const browserSync = require('browser-sync').create();
const gulpIf = require('gulp-if');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const useref = require('gulp-useref');
const header = require('gulp-header');
const gulpIgnore = require('gulp-ignore');

/**
 * Uncomment the next line to report the Gulp execution time (for optimization, etc)
 */
//require('time-require');

/**
 * Pulling in all tasks from the tasks folder
 */
requireDir('./tools/tasks', {
    recurse: true
});

/**
 * Setup global variables to use across tasks
 */
global.pkg = require('./package.json');
global.env = require('./build-env.js');

argv.prod = !!argv.prod;


/**
 * A code block that will be added to our minified code files.
 * Gets the name and appVersion and other info from the above loaded 'package.json' file.
 */
global.banner = require('./banner.js')(pkg); //TODO: double check this changes the timestamp every build.

//https://knpuniversity.com/screencast/gulp
//https://markgoodyear.com/2014/01/getting-started-with-gulp/
//http://fettblog.eu/gulp-4-parallel-and-series/
//https://www.browsersync.io/docs/gulp/
//https://github.com/ryanbenson/Harvest/blob/master/gulpfile.js

//https://css-tricks.com/gulp-for-beginners/


gulp.task('default', (done) => {
    if (argv.prod === true) {
        runSequence(
            //['clean'],
            ['buildScripts', 'buildMarkup', 'buildStyles'],
            ['minify']
        );
    } else {
        runSequence(
            //['clean'],
            ['buildScripts', 'buildMarkup', 'buildStyles']
        );
    }
});

/**
 * TODO:
 *
 * @task serve
 * @options --open
 */
gulp.task('serve', ['default'], (done) => {
    browserSync.init({
        injectChanges: true,
        open: (argv.open === true),
        server: {
            baseDir: env.DIR_DEST
        }
    });
});

<% if (markupFeatures.indexOf("icons") >= 0) { %>
gulp.task('optimizeStatic', ['todo'], function() {
});
<% } %>


/**
 * TODO:
 *
 * @task watch
 */
gulp.task('watch', (done) => {
    gulp.watch(env.DIR_SRC + '/assets/scripts/**/*.ts', ['buildScripts']);
    gulp.watch(env.DIR_SRC + '/assets/scss/**/*.scss', ['buildStyles']);
    gulp.watch(env.DIR_SRC + '/**/*.hbs', ['buildMarkup']);
});

gulp.task('minify', (done) => {
    gulp
        .src(env.DIR_DEST + '/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cleanCSS()))
        // Exclude html files so we don't the banner
        .pipe(gulpIgnore.exclude('*.html'))
        // Add banner to top of minified files
        .pipe(header(banner))
        .pipe(gulp.dest(env.DIR_DEST))
        .on('end', done);
});
