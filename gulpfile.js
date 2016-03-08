var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var minifyCSS = require('gulp-minify-css');
var express = require('express');
var app = express();

/**
 * Task to compile and minify all the LESS files into CSS
 */
gulp.task('less', function() {
    return gulp.src('assets/less/*.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('assets/css'));
});

gulp.task('scripts', function(){

});

/**
 * Initialize the express framework
 */
gulp.task('serve', function() {
    // set main path to /assets for css and js
    app.use(express.static(__dirname + '/assets'));
    // set path for bower components
    app.use('/bower_components',  express.static(__dirname + '/bower_components'));
    app.use('/config',  express.static(__dirname + '/config'));
    // output the index on request to /
    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/index.html');
    });
    // keep the server running
    app.listen(3000, function() {
        console.log('Example app listening on port 3000!');
    });
});

/**
 * Watch files for changes - dev only
 */
gulp.watch(['assets/less/*.less'], ['less']);

/**
 * Build the assets
 */
gulp.task('build', ['less', 'scripts']);

gulp.task('default', ['build', 'serve'])