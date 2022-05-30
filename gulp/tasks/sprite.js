import svgSprite from 'gulp-svg-sprite';

export const makeSprite = () => {
	return app.gulp
		.src(`${app.path.src.svgicons}`, {})
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'SVG',
					message: 'Dungeon master, you have some error: <%= error.message %>',
				})
			)
		)
		.pipe(
			svgSprite({
				mode: {
					stack: {
						sprite: '../icons/sprite.svg',
						example: false,
					},
				},
			})
		)
		.pipe(app.gulp.dest(`${app.path.build.images}`));
};
