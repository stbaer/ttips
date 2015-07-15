/* global paths */

var gulp = require('gulp');

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['jshint', 'build']);
    gulp.watch(paths.styles, ['styles']);
});
