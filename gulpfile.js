var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var gulpConcat = require('gulp-concat');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var babel = require('gulp-babel');
var inject = require('gulp-inject');
var series = require('stream-series');
//var removeHtmlComments = require('gulp-remove-html-comments');


/////////  ERROR CALLBACK   /////////
function errorLog(err){
	console.error(err.message);
	this.emit('end');
}

var files = {
    js: {
        scripts: 'src/dev/js/**/*.js',
        vender: ['src/lib/jquery/dist/jquery.min.js', 'src/lib/bootstrap/dist/js/bootstrap.min.js']
    },
    css: {
        styles: 'src/dev/css/**/*.css',
        vender: ['src/lib/bootstrap/dist/css/bootstrap.min.css']
    },
    html: {
        index: 'src/dev/index.html'
    }
}

// Lint task for JS source files
 gulp.task('lint-js', () =>
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
      .pipe(gulp.dest('src/build/js'))
 );

 gulp.task('concat-uglify-vender-js', () =>
    gulp.src(files.js.vender)
      .pipe(gulpConcat('tempVender.js'))
      .pipe(uglify())
      .on('error', errorLog)
      .pipe(rename('vender.min.js'))
      .pipe(gulp.dest('src/build/js'))
);

gulp.task('concat-uglify-styles-css', () =>
    gulp.src(files.css.styles)
      .pipe(gulpConcat('temp.css'))
      .pipe(cleanCSS({'keepSpecialComments' : 0}))
      .on('error', errorLog)
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('src/build/css'))
);

gulp.task('concat-uglify-vender-css', () =>
    gulp.src(files.css.vender)
      .pipe(gulpConcat('tempVender.css'))
      .pipe(cleanCSS({'keepSpecialComments' : 0}))
      .on('error',errorLog)
      .pipe(rename('vender.min.css'))
      .pipe(gulp.dest('src/build/css'))
);

gulp.task('copy-html', () =>
		gulp.src(files.html.index)
			.pipe(gulp.dest('src/build'))
);

// gulp.task('remove-html-comments', ['insert-css-js-links-copy-html'], () =>
// 		gulp.src('src/build/*.html')
// 			.pipe(removeHtmlComments())
// 	 		.pipe(gulp.dest('src/build'))
// );

gulp.task('insert-css-js-links-copy-html', ['run-js-files', 'run-css-files', 'copy-html'], ()=> {
		var jsMinVender = gulp.src('src/build/js/vender.min.js', {read: false});
		var jsMinUser = gulp.src('src/build/js/script.min.js', {read: false});
		var cssMinVender = gulp.src('src/build/css/vender.min.css', {read: false});
		var cssMinUser = gulp.src('src/build/css/style.min.css', {read: false});

		gulp.src('src/build/index.html')
			.pipe(inject(series(cssMinVender, cssMinUser), {ignorePath: 'src/build/', addRootSlash: false}))
			.pipe(inject(series(jsMinVender, jsMinUser), {ignorePath: 'src/build/', addRootSlash: false}))
			.on('error', errorLog)
			.pipe(gulp.dest('src/build'));
});

gulp.task('run-js-files', ['concat-uglify-vender-js', 'concat-uglify-scripts-js']);
gulp.task('run-css-files', ['concat-uglify-vender-css', 'concat-uglify-styles-css']);
gulp.task('build-app', ['remove-html-comments']);

/////////  RUN FINAL TASKS   /////////
gulp.task('watch', () => {
   gulp.watch(files.js.scripts, ['lint-js']);
	 gulp.watch('src/app/**/*', ['build']);
});

//lint without watch
gulp.task('lint', ['lint-js']);

//final build without watch
gulp.task('build', ['insert-css-js-links-copy-html']);
