'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var angularFileSort = require('gulp-angular-filesort');
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var mainBowerFiles = require('main-bower-files');
var gulpUglify = require('gulp-uglify');


gulp.task('buildLibs', function () {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest('libs'));
});


gulp.task('libs', function () {
    return gulp.src('libs/*.js')
        .pipe(angularFileSort())
        .pipe(concat('libs.js'))
        .pipe(gulpUglify())
        .pipe(gulp.dest('dist/src'));
});

gulp.task('appModules', function () {
    return gulp.src('app/js/**/*.js')
        .pipe(ngAnnotate())
        .pipe(angularFileSort())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/src'));
});

gulp.task('css', function () {
    return gulp.src('app/css/*.css')
        .pipe(concat('style.css'))
        .pipe(gulp.dest('dist/src'));
});

gulp.task('templates', function () {
    return gulp.src('app/templates/**/*.html')
        .pipe(templateCache('template.js',{
            module: 'quizApp',
            root: 'app/templates/'
        }))
        .pipe(gulp.dest('dist/src'));
});

gulp.task('index', function () {
    return gulp.src('app/index.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function () {
    gulp.watch('app/index.html', ['index']);
    gulp.watch('app/js/**/*.js', ['appModules']);
    gulp.watch('app/css/*.css', ['css']);
    gulp.watch('app/templates/**/*.html', ['templates']);
});

gulp.task('build', ['index', 'templates', 'css', 'libs', 'appModules']);