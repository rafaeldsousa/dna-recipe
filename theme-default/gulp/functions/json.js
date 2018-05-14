import dependencies from '../dependencies.js';

export function call(src, dist) {
	return dependencies.pump([
		dependencies.gulp
			.src(src),
		dependencies.load.sassJson()
			.on('error', dependencies.functions.swallowError.call),
		dependencies.gulp.dest(dist)
	]);
}
