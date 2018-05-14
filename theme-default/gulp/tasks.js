import dependencies from './dependencies.js';

/**
 * Live browser previews
 * NOTE: This will use a json object outside your project root if you provide one.
 */
dependencies.gulp.task('browserSync', () => {
	return dependencies.functions.browserSynch.call(dependencies.config.project.browserSync.path, dependencies.config.project.browserSync.defaultConfig);
});

dependencies.gulp.task('clean', () => {
	return dependencies.functions.clean.call([dependencies.config.project.PATHS.dist + 'css/', 'js/']);
});

/**
 * Minify all the svg - Make sure you're using the correct folder for your
 * svg files. You may also want to specify a different destination to the target
 */
dependencies.gulp.task('svgo', () => {
	return dependencies.functions.svgo.call(dependencies.config.project.PATHS.src + 'svg/**/*.svg', dependencies.config.project.PATHS.dist + 'svg');
});

/**
 * Create JSON objects from SCSS variables
 */
dependencies.gulp.task('json', () => {
	return dependencies.functions.json.call(dependencies.config.project.PATHS.src + 'sass/utilities/_var-breakpoints.scss', dependencies.config.project.PATHS.dist + 'js/src/');
});

/**
 * Move pure from node_modules into our distribution folder
 * We don't want to edit this file, as there's no real need with such a small framework
 */
dependencies.gulp.task('pure', () => {
	return dependencies.functions.pure.call(['node_modules/purecss/build/pure.css'], dependencies.config.project.PATHS.dist + 'css/');
});

/**
 * Compile sass, allowing for wildcard @imports. Then run autoprefixer on the output
 * so that we don't have to manually write browser prefixes
 * Use sourcemaps so that we know where things have come from when using these files
 * Minify CSS using cleanCSS, and output to an style.css file.
 */
dependencies.gulp.task('make-css', () => {
	return dependencies.functions.makeCss.call(dependencies.config.project.PATHS.src + 'sass/style.scss', dependencies.config.project.PATHS.dist + 'css/', 'style.css');
});

/**
 * Minify editor.css and move into css root
 * NOTE: we aren't renaming the file, as silverstripe looks for editor.css by default
 */
dependencies.gulp.task('cms-css', () => {
	return dependencies.functions.makeCss.call(dependencies.config.project.PATHS.src + 'sass/editor.scss', dependencies.config.project.PATHS.dist + 'css/', 'editor.css');
});

/**
 * Get all .js files in build/js/components
 * Run them through jslinting, concat into a single file, uglify,
 * and save as a script.min file
 */
dependencies.gulp.task('makejs:components', (done) => {
	return dependencies.functions.makeJsComponent.call({
		'src': [
			'node_modules/babel-polyfill/dist/polyfill.min.js', // includes polyfill for browser compatibility
			dependencies.config.project.PATHS.src + 'js/components/**/*.js'
		],
		'dist': dependencies.config.project.PATHS.dist + 'js/src/',
		'concatName': 'components.js'}, {
			'eslint': true,
			'sourcemaps': true,
			'template': {
				'enabled': false,
				'src': ''
			},
			'babel': true, // make sure to include polyfill if using babel
			'uglify': false,
			'rename': {
				'enabled': false,
				'sufix': ''
			},
			'sync': false
		}
    );
});

/**
 * Include JS dependencies added with npm
 */
dependencies.gulp.task('makejs:npm', (done) => {
	return dependencies.functions.makeJsComponent.call({
		'src': [
			'node_modules/jquery/dist/jquery.js',
			'node_modules/slick-carousel/slick/slick.js'
		],
		'dist': dependencies.config.project.PATHS.dist + 'js/src/',
		'concatName': 'npm-libs.src.js'
	}, {
		'eslint': false,
		'sourcemaps': false,
		'template': {
			'enabled': false,
			'src': ''
		},
		'babel': false,
		'uglify': false,
		'rename': {
			'enabled': false,
			'sufix': ''
		},
		'sync': false
	}
    );
});

dependencies.gulp.task('makejs:main', (done) => {
	return dependencies.functions.makeJsComponent.call({
		'src': [
			dependencies.config.project.PATHS.dist + 'js/src/npm-libs.src.js',
			dependencies.config.project.PATHS.src + 'js/lib/html5shiv-printshiv.js',
			dependencies.config.project.PATHS.src + 'js/lib/modernizr.min.js',
			dependencies.config.project.PATHS.src + 'js/lib/classList.js',
			dependencies.config.project.PATHS.src + 'js/lib/mutation-observers.js',
			dependencies.config.project.PATHS.src + 'js/lib/pointereventspolyfill.js',
			dependencies.config.project.PATHS.src + 'js/lib/jquery.placeholder.js',
			dependencies.config.project.PATHS.src + 'js/lib/toggles-switches.js',
			dependencies.config.project.PATHS.src + 'js/lib/jquery.whim.src.js',
			dependencies.config.project.PATHS.src + 'js/lib/response.src.js',
			dependencies.config.project.PATHS.src + 'js/do.src.js',
			dependencies.config.project.PATHS.src + 'js/browser_detection.src.js',
			dependencies.config.project.PATHS.src + 'js/responseTrigger.src.js',
			dependencies.config.project.PATHS.dist + 'js/src/components.js',
			dependencies.config.project.PATHS.src + 'js/start.src.js'
		],
		'dist': dependencies.config.project.PATHS.dist + 'js/src/',
		'concatName': 'script.js'
	}, {
		'eslint': false,
		'sourcemaps': false,
		'template': {
			'enabled': true,
			'src': dependencies.config.project.PATHS.dist + 'js/src/var-breakpoints.json'
		},
		'babel': false,
		'uglify': true,
		'rename': {
			'enabled': true,
			'sufix': '.min'
		},
		'sync': true
	});
});

/**
 * Include js libraries by hand to allow for specific ordering
 * Skip linting, as these are likely not our own files,
 * Combine with our other dependeniies, uglify, and write to folder
 */
dependencies.gulp.task('makejs',
	dependencies.gulp.series('makejs:components', 'makejs:npm', 'makejs:main')
);

dependencies.gulp.task('html', () => {
	return dependencies.functions.watchSync.call([dependencies.config.project.PATHS.src + 'templates/**/*.ss'], dependencies.config.project.PATHS.dist + 'templates');
});

dependencies.gulp.task('images', () => {
	return dependencies.functions.watchSync.call([dependencies.config.project.PATHS.src + 'images/**/*'], dependencies.config.project.PATHS.dist + 'images');
});

dependencies.gulp.task('fonts', () => {
	return dependencies.functions.watchSync.call([dependencies.config.project.PATHS.src + 'fonts/**/*'], dependencies.config.project.PATHS.dist + 'fonts');
});

dependencies.gulp.task('copy', dependencies.gulp.parallel('images', 'fonts', 'html'));

dependencies.gulp.task('build', (done) => {
	return dependencies.gulp.series('clean', dependencies.gulp.parallel('copy', 'svgo', 'pure', 'json'), dependencies.gulp.parallel('make-css', 'cms-css', 'makejs'))(done);
});

dependencies.gulp.task('run', (done) => {
	return dependencies.gulp.series('build', 'browserSync')(done);
});

dependencies.gulp.task('init', (done) => {
	return dependencies.gulp.series('run', 'watch')(done);
});

dependencies.gulp.task('watch', () => {
	dependencies.gulp.watch(dependencies.config.project.PATHS.src + 'sass/**/*.scss', dependencies.gulp.parallel('make-css', 'cms-css')); // watch sass in project sass folder, run tasks
	dependencies.gulp.watch(dependencies.config.project.PATHS.src + 'js/**/*.js', dependencies.gulp.parallel('makejs')); // watch js in project js folder, run tasks
	dependencies.gulp.watch(dependencies.config.project.PATHS.src + 'svg/**/*.svg', dependencies.gulp.parallel('svgo')); // Watch for template changes so we can stream to the browser
	dependencies.gulp.watch(dependencies.config.project.PATHS.src + 'images/**/*.*', dependencies.gulp.parallel('images'));
	dependencies.gulp.watch(dependencies.config.project.PATHS.src + 'fonts/**/*.*', dependencies.gulp.parallel('fonts')); // Watch for template changes so we can stream to the browser
	dependencies.gulp.watch(dependencies.config.project.PATHS.src + 'templates/**/*.ss', dependencies.gulp.parallel('html')); // Watch for template changes so we can stream to the browser
});

dependencies.gulp.task('default', dependencies.gulp.parallel('init'));
