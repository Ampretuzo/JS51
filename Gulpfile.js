/**
 * Created by aro on 7/26/17.
 */

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat');

var clientJs = 'src/client/**/*.js';

// create a default task and just log a message
gulp.task('default', function() {
    return gutil.log('Gulp is running!')
    // TODO
});

gulp.task('client-js', function () {
    return gulp.src(['src/client/drawer.js', 'src/client/test.js', clientJs])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('public/javascripts/bundle'));
    // uglify არ მინდა ახლა
});

gulp.task('client-dev', function () {
    gulp.watch(clientJs, ['client-js']);
});
