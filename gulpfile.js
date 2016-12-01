'use strict'

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var bulkSass = require('gulp-sass-glob-import');
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');
var browserSync = require('browser-sync').create();

gulp.task('start', ['styles'], function(){
   browserSync.init({
        server: './dist/'
    });
    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
});

gulp.task('styles', function(){
  gulp.src('app/styles/**/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe(bulkSass())
    .pipe($.autoprefixer({browsers: ['last 2 versions', 'IE 10']}))
    .pipe($.sass(
      {
        outputStyle: 'compressed',
        includePaths: ['app/styles/**/*']
      }
    ).on('error', $.sass.logError))
    .pipe($.concat('main.css'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function(){
  gulp.src('app/scripts/app.js')
    .pipe($.plumber())
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist/js/'))
    .pipe(browserSync.stream());
});


//TODO: task to build prod ready files