import gulp from 'gulp'
import sass from 'gulp-sass'

function sass_compiler(path, file) {
	return () =>
		gulp.src([path, file].join('/')).pipe(sass()).pipe(gulp.dest(path))
}

gulp.task(
	'GENERATOR test compiling',
	sass_compiler('./tests/generator', 'generator.test.scss'),
)
gulp.task(
	'MIXIN test compiling',
	sass_compiler('./tests/mixin', 'mixin.test.scss'),
)

gulp.task(
	'sass',
	gulp.parallel('GENERATOR test compiling', 'MIXIN test compiling'),
)

gulp.task('default', gulp.series('sass'))
