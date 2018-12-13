
//NPM-MODULES
//--------------------------------------------------
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require("gulp-rename");
var imagemin = require('gulp-imagemin');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var util = require('gulp-util');
var is_prod = util.env.production;


//TASK: gulp
//--------------------------------------------------
gulp.task('default', ['less', 'js'], function () {
	is_prod ? gulp.start('img') : gulp.start('watch');
});

//TASK: gulp watch
//--------------------------------------------------
gulp.task('watch', function() {
	gulp.watch(['./less/**/*.less'], ['less']);
	gulp.watch(['./js/**/*.js', '!./js/scripts.min.js'], ['js']);
});

//TASK: gulp img
//--------------------------------------------------
gulp.task('img', function() {
	gulp.src(['./{img,css}/**/*.{png,jpg,jpeg,gif}', './screenshot.png'])
	.pipe(plumber())
	.pipe(imagemin({progressive: true}))
	.pipe(gulp.dest("./"));
});

//TASK: gulp less
//--------------------------------------------------
gulp.task('less', function () {
	gulp.src(['./less/style.less'])
	.pipe(plumber())
	.pipe(less())
	.pipe(cleanCSS())
	.pipe(rename({extname: ".min.css"}))
	.pipe(autoprefixer({browsers: ['last 50 versions']}))
	.pipe(cleanCSS({compatibility: 'ie8', keepSpecialComments: 1}) )
	.pipe(gulp.dest('./css'))
});


//TASK: gulp js
//--------------------------------------------------
gulp.task('js', function() {
	return gulp.src(['./js/main.js'])
	.pipe(plumber())
	.pipe(concat('./scripts.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest("./js"));
});