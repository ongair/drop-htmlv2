'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var del = require('del');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');

var options = {
    src: 'app/scripts',
    dest: 'app/assets',
    angular_dir: 'app/components/angular-1.4.4',
    bower_components: 'app/bower_components'
};

gulp.task('compileSass', function(){
    return gulp.src('app/assets/scss/application.scss')
    .pipe(maps.init())
    .pipe(sass())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('app/assets/css'));
});

gulp.task('concatScripts', function(){
    return gulp.src([
        options.angular_dir + '/angular.min.js',
        options.angular_dir + '/angular-animate.min.js',
        options.angular_dir + '/angular-touch.min.js',
        options.angular_dir + '/angular-resource.min.js',
        options.angular_dir + '/angular-sanitize.min.js',
        'app/components/bootstrap/ui-bootstrap-tpls-0.13.3.min.js',
        'app/components/hammerjs/hammer.min.js',

        options.bower_components + '/oauth-js/dist/oauth.min.js',
        options.bower_components + '/angular-ui-router/release/angular-ui-router.min.js',
        options.bower_components + '/moment/moment.js',
        options.bower_components + '/angular-moment/angular-moment.js',
        options.bower_components + '/angular-loading-bar/build/loading-bar.min.js',
        options.bower_components + '/angular-gestures/gestures.min.js',

        options.src + '/**/*.js'
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(options.dest + '/js'));
});

gulp.task('annotateScripts', ['concatScripts'], function(){
    return gulp.src(options.dest +'/js/app.js')
        .pipe(ngAnnotate())
        .pipe(gulp.dest(options.dest + '/js'));
});

gulp.task('minifyScripts', ['annotateScripts'], function(){
    return gulp.src(options.dest +'/js/app.js')
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest(options.dest + '/js'));
});

gulp.task('clean', function(){
    del([options.dest+'/js',options.dest+'/css']);
});

gulp.task('default',['clean'], function(){
    gulp.start('compileSass');
    gulp.start('minifyScripts');
});
