import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';
import dotenv from 'dotenv';

dotenv.config();

const sass = gulpSass(dartSass);
const bs = browserSync.create();

function browsersync() {
	bs.init({
		proxy: process.env.BS_CONFIG_PROXY ,
		port: 3000,
		open: false,
		notify: false,
		ui: false,
		ghostMode: false,
		logLevel: 'info',
		logPrefix: 'BrowserSync',
		reloadOnRestart: true,
		files: [
			'./assets/*.css'
		]
	});
}

gulp.task('sass', function () {
	return gulp.src('./styles/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(rename(function (path) {
			path.dirname = '';
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./assets'))
		.pipe(bs.stream());
});

gulp.task('watch', function () {
	gulp.watch('./styles/**/*.scss', gulp.series('sass')); 
});

gulp.task('serve', gulp.series('sass', function() {
	browsersync();
	gulp.watch('./styles/**/*.scss', gulp.series('sass'));
}));

gulp.task('default', gulp.series('serve'));