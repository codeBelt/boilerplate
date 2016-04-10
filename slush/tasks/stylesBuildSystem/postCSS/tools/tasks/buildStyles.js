const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');

const allowAutoPrefixer = <%= stylesFeatures.indexOf("autoprefixer") >= 0 %>;

gulp.task('buildStyles', (done) => {

    const processors = [
    ];

    if (allowAutoPrefixer === true) {
        processors.push(
            autoprefixer({ browsers: ['last 2 versions'] })
        );
    }

    return gulp
        .src(env.DIR_SRC + '/assets/styles/**/*.css')
        // .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(env.DIR_DEST + '/assets/styles/'))
        .pipe(reloadBrowser({stream: true}));

});
