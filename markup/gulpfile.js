var gulp = require('gulp');
var stylus = require('gulp-stylus');
var del = require('del');
var nib = require('nib');
var server = require('gulp-server-livereload');
var runSequence = require('run-sequence');


gulp.task('clean', function () {
    return del('./css');
});

gulp.task('styl', function () {
    return gulp
        .src('./stylus/*.styl')
        .pipe(stylus({
            use: nib(),
            'include css': true
        }))
        .pipe(gulp.dest('./css/'));
});

gulp.task('webserver', function () {
    gulp.src('./')
        .pipe(server({
            livereload: true,
            directoryListing: true,
            open: true
        }));
});


gulp.task('style', function (callback) {
    runSequence(
        'clean',
        'styl',
        'webserver',
        callback
    );
});