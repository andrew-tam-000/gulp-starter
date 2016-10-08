var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var gulpWebpack = require('gulp-webpack');
var webpack = require('webpack');
var browserSync = require('browser-sync').create();
var path = require('path');


var SASS_INPUT = './src/scss/**/*.scss';
var SASS_OUTPUT_DIR = './public/lib/css';
var SASS_OUTPUT_FILEPATH = path.join(SASS_OUTPUT_DIR, 'main.css');

var JS_INPUT = './src/js/main.js';
var JS_OUTPUT_DIR = './public/lib/js';
var JS_OUTPUT_FILENAME = 'bundle.js';
var JS_OUTPUT_FILEPATH = path.join(JS_OUTPUT_DIR, JS_OUTPUT_FILENAME);


gulp.task('scss:watch', function() {
    gulp.watch(SASS_INPUT, ['scss']);
});


gulp.task('scss', function() {
    return gulp.src(SASS_INPUT)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(SASS_OUTPUT_DIR));
});

gulp.task('js:watch', function() {
    return gulp.src(JS_INPUT)
        .pipe(gulpWebpack({
            watch: true
            , module: {
                loaders: [
                    {
                        test: /\.js/
                        , exclude: /(node_modules)/
                        , loader: 'babel'
                    }
                ]
            }
            , output: {
                filename: JS_OUTPUT_FILENAME
            }
            , devtool: 'eval-source-map'
        }, webpack))
        .pipe(gulp.dest(JS_OUTPUT_DIR))
    ;
});

gulp.task('watch', ['scss:watch', 'js:watch']);

gulp.task('browser-sync', function() {

    browserSync.init({
        server: {
            baseDir: './public'
        }
        , open: false
    });

    gulp.watch(JS_OUTPUT_FILEPATH).on('change', browserSync.reload);

    gulp.watch(SASS_OUTPUT_FILEPATH).on('change', function() {
        return gulp.src(SASS_OUTPUT_FILEPATH)
            .pipe(browserSync.stream())
        ;
    });

});

gulp.task('start', ['watch', 'browser-sync']);

gulp.task('build');
