'use strict'
var production = false;

var paths = {
  src: 'src/**/*',
  srcLayouts: 'src/layouts/**/*.html',
  srcSass: 'src/sass/app.scss',
  srcJs: 'src/js/app.js',
  deployLayout: 'deploy/',
  deployCss: 'deploy/assets/css',
  deployJs: 'deploy/assets/js',
  deployImages: 'deploy/assets/images',
  deployFonts: 'deploy/assets/fonts',
  // deployProduction: 'proud/assets/fonts'
};


/*********************************************
*   Required
*********************************************/
var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  importcss = require('gulp-import-css'),
  include = require("gulp-include"),
  rimraf = require('gulp-rimraf'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  beautify = require('gulp-beautify'),
  uglify = require('gulp-uglify'),
  cleanCSS = require('gulp-clean-css'),
  gulpif = require('gulp-if'),
  ignore = require('ignore'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  fs = require('fs'),
  sequence = require('run-sequence');


function swallowError (error) {
  // If you want details of the error in the console
  return console.log(error.toString())
  this.emit('end')
}


/*******************************************
*   CLEAN
*******************************************/
gulp.task('clean', function () {
  return gulp.src('./deploy', { read: false }) // much faster
  .pipe(rimraf({ force: true }));
});


/*******************************************
*   CACHE BUSTING
*******************************************/
var uuid = 'xxxxxxxx-xxxx-Txxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var d = new Date().getTime();
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
});

gulp.task('fingerprint', function (cb) {
    fs.writeFile('./deploy/assets/fingerprint.json', '{"id":"' + uuid + '"}', cb);
});


/*******************************************
*  SASS
*******************************************/
gulp.task('sass', function() {
    gulp.src(paths.srcSass)
        .pipe(include())
        .pipe(sourcemaps.init({loadMaps: true}))  // Process the original sources
        .pipe(sass())
        .on('error', swallowError)
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))

        .pipe(sourcemaps.write()) // Add the map to modified source.
        .pipe(rename('app.css'))
        .pipe(gulpif(production, cleanCSS()))
        .pipe(gulp.dest(paths.deployCss))
        .pipe(gulpif(production, rename({ suffix: '.' + uuid })))
        .pipe(gulp.dest(paths.deployCss))
});


/*******************************************
*  JS
*******************************************/
gulp.task('js', function() {
    gulp.src('src/js/app.js')
        .pipe(include())
        .pipe( gulpif(production, uglify(), beautify({indent_size: 4})))
        .on('error', swallowError)
        .pipe( gulp.dest('deploy/assets/js') )
        .pipe(gulpif(production, rename({ suffix: '.' + uuid })))
        .pipe( gulp.dest('deploy/assets/js') );
});


/*******************************************
*  HTML
*******************************************/
gulp.task('html', function() {
    gulp.src('src/layouts/*.html')
        .pipe(include())
        .pipe( gulp.dest('deploy/') );
});


/*******************************************
*  Images
*******************************************/
gulp.task('images', function() {
    gulp.src('src/images/**/*')
        .pipe(gulpif(production, imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ])))
        .pipe( gulp.dest('deploy/assets/images') );
});


/*******************************************
*   FONTS
*******************************************/
gulp.task('fonts', function () {
    gulp.src('src/fonts/**/*.{eot,svg,ttf,woff,woff2}')
        .pipe( gulp.dest('deploy/assets/fonts') );
});


/*******************************************
*  WATCH
*******************************************/
gulp.task('watch', ['build'],function() {
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/layouts/**/*.html', ['html']);
  gulp.watch('src/images/**/*', ['images']);
  gulp.watch('src/fonts/**/*', ['fonts']);
});

gulp.task('build', function (){
    sequence(['sass', 'js', 'html','images', 'fonts'])
})

gulp.task('deploy', function (){
  production = true;
  sequence('clean', ['build']);
})
