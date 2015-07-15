/* global console */

var gulp = require('gulp'),
    exec = require('child_process').exec;

gulp.task('build', function (done) {
    exec('npm run build', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);

        done(err);
    });
});
