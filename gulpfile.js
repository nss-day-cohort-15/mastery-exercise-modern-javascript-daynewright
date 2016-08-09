var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

/////////  ERROR CALLBACK   /////////
function errorLog(err){
	console.error(err.message);
	this.emit('end');
}

var files = {
    jsScripts : 'src/js/**/*.js',
    jsVender  : ['src/lib/jquery/dist/jquery.min.js','src/lib/bootstrap/dist/js/bootstrap.min.js']
    }

// Lint task for JS source files
 gulp.task('lint', () =>
    gulp.src(files.jsScripts)
      .pipe(jshint())
      .pipe(jshint.reporter('default'), {verbose: true})
 );

// Concat and minification for final DOM files
 gulp.task('concat-uglify-scripts', () =>
    gulp.src(files.jsScripts)
      .pipe(concat('temp.js'))
      .pipe(uglify())
      .on('error', errorLog)
      .pipe(rename('script.min.js'))
      .pipe(gulp.dest('src/app/js'))
 );

 gulp.task('concat-vender', () =>
    gulp.src(files.jsVender)
      .pipe(concat('tempVender.js'))
      .on('error', errorLog)
      .pipe(rename('vender.min.js'))
      .pipe(gulp.dest('src/app/js'))
);


/////////  RUN TASKS   /////////
 gulp.task('watch', () => {
   gulp.watch(files.jsScripts, ['lint']);
 });

 gulp.task('build', ['concat-uglify-scripts', 'concat-vender']);
