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
const del = require('del');

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

//argv.prod = !!argv.prod;

/**
 * All builds are considered to be production builds, unless they're not.
 */
global.isProd = !!argv.prod;
global.isStage = !!argv.stage;
global.isDev = !!argv.dev;

global.isProd = (isStage === false && isDev === false);

/**
 * A code block that will be added to the minified code files.
 */
global.banner = require('./tools/banner.js')(pkg);

//https://knpuniversity.com/screencast/gulp
//https://markgoodyear.com/2014/01/getting-started-with-gulp/
//http://fettblog.eu/gulp-4-parallel-and-series/
//https://www.browsersync.io/docs/gulp/
//https://github.com/ryanbenson/Harvest/blob/master/gulpfile.js

//https://css-tricks.com/gulp-for-beginners/

// -- Tasks ----------------------------------------------------------------
/**
 * Run default tasks for the target environment.
 *
 * @task default
 */
gulp.task('default', (done) => {
    runSequence(
        // Ran `gulp --dev`
        (isDev === true) ? ['build'] :
        // Ran `gulp --stage`
        (isStage === true) ? ['lint', 'build'] :
        // Ran `gulp --prod`
        (isProd === true) ? ['lint', 'build'] : []
    );
});

/**
 * Cleaning tasks
 *
 * @task clean:*
 */
gulp.task('clean:dest', (done) => {
    return del(env.DIR_DEST);
});

gulp.task('clean:docs', (done) => {
    return del(env.DIR_DOCS);
});

gulp.task('clean:installed', (done) => {
    return del([
        'tools/node-*',
        env.DIR_BOWER,
        env.DIR_NPM
    ]);
});

/**
 * Compile source code and outputs to destination.
 *
 * @task build
 */
gulp.task('build', (done) => {
    //'buildStatic'
    if (argv.prod === true) {
        runSequence(
            ['clean:dest'],
            [ 'buildMarkup', 'buildStyles', 'buildScripts'],
            ['minify']
        );
    } else {
        runSequence(
            ['clean:dest'],
            [ 'buildMarkup', 'buildStyles', 'buildScripts']
        );
    }
});

/**
 * Minify source code.
 *
 * @task minify
 */
gulp.task('minify', (done) => {
    gulp
        .src(env.DIR_DEST + '/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cleanCSS()))
        .pipe(gulpIf('**/*.{css,js}', header(banner)))
        .pipe(gulp.dest(env.DIR_DEST))
        .on('end', done);
});

/**
 * Generate documentation.
 *
 * @task docs
 */
gulp.task('docs', (done) => {
    runSequence(
        ['clean:docs'],
        ['buildDocs']
    );
});

/**
 * Validate code syntax.
 *
 * @task lint
 */
gulp.task('lint', (done) => {
    runSequence(
        ['lintScripts']
    );
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
    /**
     * Optimizes images.
     *
     * @task optimizeStatic
     */
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

/**
 * Inject 3rd-party library references from bower.json into source code.
 *
 * @task inject
 */
gulp.task('inject', (done) => {
    runSequence(
        ['injectStyles', 'injectScripts']
    );
});

// Watches files and directories changes and runs associated tasks automatically.
// For LiveReload, download browser extension at http://go.livereload.com/extensions
///*watch: {
//    options: {
//        livereload: {
//            // Default port for LiveReload
//            // *Will not work if multiple users run using the same port on a shared server*
//            port: 35729
//        }
//    },
//    watchVendor: {
//        files: [env.DIR_BOWER + '/!**!/!*'],
//            tasks: [
//            'buildScripts',
//            'buildStyles'
//        ]
//    },
//    watchMarkup: {
//        files: [env.DIR_SRC + '/!**!/!*.html'],
//            tasks: ['buildMarkup']
//    },
//    watchStatic: {
//        files: [
//            env.DIR_SRC + '/!**!/.htaccess',
//            env.DIR_SRC + '/!**!/!*.{php,rb,py,jsp,asp,aspx,cshtml,txt}',
//            env.DIR_SRC + '/assets/media/!**',
//        ],
//            tasks: ['buildStatic']
//    },
//    watchStyles: {
//        files: [env.DIR_SRC + '/assets/styles/!**!/!*'],
//            tasks: ['buildStyles']
//    },
//    watchScripts: {
//        files: [env.DIR_SRC + '/assets/scripts/!**!/!*'],
//            tasks: ['buildScripts']
//    }
//},
//});*/

//grunt.registerTask('default', 'Run default tasks for the target environment.',
//    // Ran `grunt`
//    grunt.option('dev')   ? ['build'] :
//        // Ran `grunt --stage`
//        grunt.option('stage') ? ['lint', 'build'] :
//            // Ran `grunt --prod`
//            grunt.option('prod')  ? ['lint', 'build', 'docs'] : []
//);
//grunt.registerTask(
//    'build',
//    'Compile source code and outputs to destination.',
//    ['clean:dest', 'buildStatic', 'buildMarkup', 'buildStyles', 'buildScripts', 'clean:tmp']
//);
//grunt.registerTask(
//    'docs',
//    'Generate documentation.',
//    ['clean:docs', 'docsScripts', 'clean:tmp']
//);
//grunt.registerTask(
//    'lint',
//    'Validate code syntax.',
//    ['lintScripts']
//);
//grunt.registerTask(
//    'inject',
//    'Inject 3rd-party library references from bower.json into source code.',
//    ['injectStyles', 'injectScripts']
//);
//
//grunt.loadNpmTasks('grunt-contrib-watch');
