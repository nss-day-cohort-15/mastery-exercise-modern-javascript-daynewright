var gulp    = require('gulp');
var jshint  = require('gulp-jshint');

 gulp.task('lint', function(){
    return gulp.src('./src/js/**/*.js')
           .pipe(jshint())
           .pipe(jshint.reporter('default'), {verbose: true});
 });

 gulp.task('watch', function(){
    gulp.watch('src/js/**/*.js', ['lint']);
 });
