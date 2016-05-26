const gulp = require('gulp');
const postcss = require('gulp-postcss');
const atImport = require("postcss-import");
const sourcemaps = require('gulp-sourcemaps');
const discardComments = require('postcss-discard-comments');
const apply = require('postcss-apply');
const cssnext = require('postcss-cssnext');

const allowAutoPrefixer = {{ stylesFeatures.indexOf('autoprefixer') >= 0 }};

gulp.task('buildStyles', (done) => {

    const processors = [
        atImport,
        discardComments,
        apply,
        cssnext
    ];

    return gulp
        .src(env.DIR_SRC + '/assets/styles/*.css')
        // .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(env.DIR_DEST + '/assets/styles/'))
        .pipe(reloadBrowser({stream: true}));

});
