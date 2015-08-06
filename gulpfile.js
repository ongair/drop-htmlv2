'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');
var del = require('del');

gulp.task('compileSass', function(){
    return gulp.src('app/assets/scss/application.scss')
    .pipe(maps.init())
    .pipe(sass())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('app/assets/css'));
});

gulp.task('default', function(){
    gulp.start('compileSass');
});
