import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';

const sass = gulpSass(dartSass);

gulp.task('sass', function () {
	return gulp.src('./styles/**/*.scss')
	  .pipe(sourcemaps.init())
	  .pipe(sass().on('error', sass.logError))
	  .pipe(rename(function (path) {
		path.dirname = '';
	  }))
	  .pipe(sourcemaps.write('./'))
	  .pipe(gulp.dest('./assets'));
  });


gulp.task('watch', function () {
  gulp.watch('./styles/**/*.scss', gulp.series('sass')); 
});


gulp.task('default', gulp.series('sass', 'watch'));