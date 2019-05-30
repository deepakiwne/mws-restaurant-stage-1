/*eslint-env node */

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task(
	'default',
	['copy-html', 'copy-images', 'styles', 'scripts', 'copy-data'],
	async function() {
		gulp.watch('css/**/*.css', ['styles']);
		gulp.watch('js/**/*.js', ['scripts']);
		gulp.watch('index.html', ['copy-html']);
		gulp.watch('restaurant.html', ['copy-html']);
		gulp.watch('./dist/index.html').on('change', browserSync.reload);
		gulp.watch('./dist/restaurant.html').on('change', browserSync.reload);
		gulp.watch('./dist/css/styles.css').on('change', browserSync.reload);
		gulp.watch('./dist/js/**/*/js').on('change', browserSync.reload);

		browserSync.init({
			server: './dist',
			port: 8000
		});
	}
);

gulp.task('dist', [
	'copy-html',
	'copy-images',
	'styles',
	'scripts-dist',
	'img-min',
	'copy-data'
]);

gulp.task('scripts', async function() {
	gulp
		.src('js/**/*.js')
		.pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-dist', async function() {
	gulp
		.src('js/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('copy-html', async function() {
	gulp.src('./*.html').pipe(gulp.dest('./dist'));
});

gulp.task('copy-data', async function() {
	gulp.src('./data/**/*').pipe(gulp.dest('./dist/data'));
});

gulp.task('copy-images', async function() {
	gulp.src('img/*').pipe(gulp.dest('dist/img'));
});

gulp.task('styles', async function() {
	gulp
		.src('css/**/*.css')
		.pipe(gulp.dest('dist/css'));
		// .pipe(browserSync.stream());
});

gulp.task('img-min', async function() {
    return gulp.src('src/images/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/images'));
});
