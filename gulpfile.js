var gulp = require('gulp');
var babel = require('gulp-babel');
var exec = require('exec-chainable');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');

gulp.task('build', function () {
    return gulp.src('src/index.es6')
        .pipe(babel())
        .on('error', function () {
            gutil.log('babel error', arguments);
            this.emit('end');
        })
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

    return gulp.watch('src/**/*.es6', ['run']);
    // return gulp.watch('src/**/*.es6')
    //     // .pipe(plumber())
    //     .pipe(babel())
    //     .on('error', (err) => {
    //       gutil.log(gutil.colors.red('[Compilation Error]'));
    //       gutil.log(gutil.colors.red(err.message));
    //     })
    //     .pipe(gulp.dest('lib'));

    // return gulp.src('src/**/*.es6')
    //     .pipe(plumber({
    //         errorHandler: function (err) {
    //             console.log(err);
    //             this.emit('end');
    //         }
    //     }))
    //     .pipe(less)
    //     .dest(gulp.dest('./build'));
});


gulp.task('default', ['watch']);
