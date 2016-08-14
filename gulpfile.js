var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var gulpConcat = require('gulp-concat');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var babel = require('gulp-babel');
var inject = require('gulp-inject');


/////////  ERROR CALLBACK   /////////
function errorLog(err){
	console.error(err.message);
	this.emit('end');
}

var files = {
 js : {
				 scripts : 'src/dev/js/**/*.js',
				 vender  : ['src/lib/jquery/dist/jquery.min.js','src/lib/bootstrap/dist/js/bootstrap.min.js']
			 },
 css : {
				 styles : 'src/dev/css/**/*.css',
				 vender : ['src/lib/bootstrap/dist/css/bootstrap.min.css']
			 },
 html : {
				 index : 'src/dev/index.html'
			 }
}

// Lint task for JS source files
 gulp.task('lint', () =>
    gulp.src(files.js.scripts)
      .pipe(jshint({'esversion': 6}))
      .pipe(jshint.reporter('default'), {verbose: true})
 );

// Concat and minification for final DOM files
 gulp.task('concat-uglify-scripts-js', () =>
    gulp.src(files.js.scripts)
      .pipe(gulpConcat('temp.js'))
			.pipe(babel({presets: ['es2015']}))
      .pipe(uglify())
      .on('error', errorLog)
      .pipe(rename('script.min.js'))
      .pipe(gulp.dest('src/app/js'))
 );

 gulp.task('concat-uglify-vender-js', () =>
    gulp.src(files.js.vender)
      .pipe(gulpConcat('tempVender.js'))
      .pipe(uglify())
      .on('error', errorLog)
      .pipe(rename('vender.min.js'))
      .pipe(gulp.dest('src/app/js'))
);

gulp.task('concat-uglify-styles-css', () =>
    gulp.src(files.css.styles)
      .pipe(gulpConcat('temp.css'))
      .pipe(cleanCSS({'keepSpecialComments' : 0}))
      .on('error', errorLog)
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('src/app/css'))
);

gulp.task('concat-uglify-vender-css', () =>
    gulp.src(files.css.vender)
      .pipe(gulpConcat('tempVender.css'))
      .pipe(cleanCSS({'keepSpecialComments' : 0}))
      .on('error',errorLog)
      .pipe(rename('vender.min.css'))
      .pipe(gulp.dest('src/app/css'))
);

gulp.task('copy-html', () =>
		gulp.src(files.html.index)
			.pipe(gulp.dest('src/app'))
);

gulp.task('insert-css-js-links', ['run-js-files', 'run-css-files', 'copy-html'], ()=> {
		var sources = gulp.src(['src/app/js/*.js','src/app/css/*.css'], {read: false});

		gulp.src('src/app/index.html')
			.pipe(inject(sources, {ignorePath: 'src/app/', addRootSlash: false}))
			.on('error', errorLog)
			.pipe(gulp.dest('src/app'));
});

gulp.task('run-js-files', ['concat-uglify-vender-js', 'concat-uglify-scripts-js']);
gulp.task('run-css-files', ['concat-uglify-vender-css', 'concat-uglify-styles-css']);


/////////  RUN TASKS   /////////
 gulp.task('watch', () => {
   gulp.watch(files.js.scripts, ['lint']);
	 gulp.watch('src/app/**/*', ['build']);
 });

 gulp.task('build', ['copy-html', 'insert-css-js-links']);
