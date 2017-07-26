/**
 * Created by aro on 7/26/17.
 */

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    tap = require('gulp-tap'),
    buffer = require('gulp-buffer'),
    browserify = require('browserify');

var clientJs = 'src/client/**/*.js';

// create a default task and just log a message
gulp.task('default', function() {
    return gutil.log('Gulp is running!')
    // TODO
});

gulp.task('client-js', function () {
    return gulp.src(['src/client/drawer.js', 'src/client/test.js', clientJs])
        .pipe(tap(function (file) {
            gutil.log('bundling ' + file.path);
            file.contents = browserify(file.path).bundle();
        }))
        // გალპს უნდა ბაფერკონტენტი და არა სტრიმინგ კონტენტი, მოკლედ ერთი ტიპის დინებიდან მეორეში გადაგვყავს რო მილში გავიდეს
        .pipe(buffer())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('public/javascripts/bundle'));
    // uglify არ მინდა ახლა და შესაბამისად sourceMap-იც არ მჭირდება
});

gulp.task('client-dev', function () {
    gulp.watch(clientJs, ['client-js']);
});
