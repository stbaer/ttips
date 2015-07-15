var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var csso = require('gulp-csso');
var size = require('gulp-size');
var autoprefixer = require('gulp-autoprefixer');

var AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

gulp.task('styles', function() {

    gulp.src(['./src/ttips.less'])
        .pipe(less())
        .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(gulp.dest('dist/css'))
        .pipe(csso())
        .pipe(rename(function (path) {
            path.basename += '.min';
        }))
        .pipe(size({
            showFiles: true
        }))
        .pipe(size({
            gzip: true,
            showFiles: true
        }))
        .pipe(gulp.dest('dist/css'));
});
