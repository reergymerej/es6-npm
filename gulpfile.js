var gulp = require('gulp');
var babel = require('gulp-babel');
var exec = require('exec-chainable');
var gutil = require('gulp-util');

gulp.task('build', function () {
    return gulp.src('src/index.es6')
        .pipe(babel())
        .pipe(gulp.dest('lib'));
});

gulp.task('run', ['build'], function (cb) {
    exec('node ./lib/index').then(function (stdout) {
        gutil.log(stdout);
        cb();
    });
});

gulp.task('watch', function () {
    gutil.log('Watch yourself.');
});

gulp.task('default', ['run']);
