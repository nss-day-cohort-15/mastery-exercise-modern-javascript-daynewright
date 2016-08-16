const gulp = require('gulp'),
      connect = require('gulp-connect'),
      jshint = require('gulp-jshint'),
      uglify = require('gulp-uglify'),
      gulpConcat = require('gulp-concat'),
      order = require('gulp-order'),
      rename = require('gulp-rename'),
      cleanCSS = require('gulp-clean-css'),
      babel = require('gulp-babel'),
      inject = require('gulp-inject'),
      series = require('stream-series'),
      imagemin = require('gulp-imagemin');

/////////  ERROR CALLBACK   /////////
function errorLog(err){
	console.error(err.message);
	this.emit('end');
}
/////////  ERROR CALLBACK   /////////


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

// Concat and minification for final DOM files
 gulp.task('concat-uglify-scripts-js', () =>
    gulp.src(files.js.scripts)
  	  .pipe(babel({presets: ['es2015']}))
  		.pipe(order([
  			'robot.js',
  			'drone.js',
  			'bipedal.js',
  			'atv.js',
  			'weapons.js',
  			'setup.js',
  			'domevents.j',
  			'**/*.js'
  		]))
  		.on('error',errorLog)
      .pipe(gulpConcat('temp.js'))
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

gulp.task('copy-image-min', () =>
    gulp.src('src/dev/images/*')
      .pipe(imagemin())
      .pipe(gulp.dest('src/build/images'))
);

gulp.task('copy-html', () =>
  	gulp.src(files.html.index)
  		.pipe(gulp.dest('src/build'))
);

gulp.task('insert-css-js-links-copy-html', ['run-js-files', 'run-css-files','copy-image-min', 'copy-html'], ()=> {
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

///////////////////////////////////////////////////////////

// Lint task for JS source files
 gulp.task('lint-js', () =>
    gulp.src(files.js.scripts)
      .pipe(jshint({'esversion': 6}))
      .pipe(jshint.reporter('default'), {verbose: true})
 );
// Lint task for JS source files

// Babel task for JS source files
 gulp.task('babel-js',() =>
    gulp.src(files.js.scripts)
      .pipe(babel({presets: ['es2015']}))
      .pipe(gulp.dest('src/dev/babel'))
 );
 // Babel task for JS source files

///////////////////////////////////////////////////////////

//dev connect server and changes
gulp.task('connect-dev', () =>
  connect.server({
    root: 'src',
		port: 8081,
    livereload: true
	})
);
gulp.task('changes-dev', () =>
gulp.src('src/dev/**/*')
	.pipe(connect.reload())
);
//dev connect server and changes

///////////////////////////////////////////////////////////

//watch changes > lint > reload
gulp.task('watch-dev', () =>
	 gulp.watch('src/dev/**/*', ['changes-dev'])
);

gulp.task('watch-lint', () =>
	gulp.watch(files.js.scripts, ['lint-js'])
);

gulp.task('watch-babel', () =>
  gulp.watch(files.js.scripts, ['babel-js'])
);

///////////////////////////////////////////////////////////

gulp.task('run-js-files', ['concat-uglify-vender-js', 'concat-uglify-scripts-js']);
gulp.task('run-css-files', ['concat-uglify-vender-css', 'concat-uglify-styles-css']);

///////////////////////////////////////////////////////////

/////////  RUN TASKS BELOW   /////////

//watch and reload with lint
gulp.task('watch-reload', ['connect-dev', 'watch-dev', 'watch-lint', 'watch-babel']);

//lint
gulp.task('lint', ['lint-js']);

//final build
gulp.task('build', ['insert-css-js-links-copy-html']);
