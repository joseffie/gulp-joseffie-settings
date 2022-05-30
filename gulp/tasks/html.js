import webpHtmlNosvg from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number';
import pug from 'gulp-pug';

import fs from 'fs';
import data from 'gulp-data';

export const html = () => {
	return (
		app.gulp
			.src(app.path.src.html)
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: 'PUG',
						message: "You're having some errors: <%= error.message %>",
					})
				)
			)
			// Parsing JSON
			.pipe(
				data(() => {
					return JSON.parse(
						fs.readFileSync('./src/base/data/data.json', 'utf8')
					);
				})
			)
			.pipe(
				pug({
					pretty: false,
					verbose: true,
				})
			)
			.pipe(app.plugins.replace(/@img\//g, 'img/'))
			.pipe(app.plugins.if(app.isBuild, webpHtmlNosvg()))
			.pipe(
				app.plugins.if(
					app.isBuild,
					versionNumber({
						value: '%DT%',
						append: {
							key: '_v',
							cover: 0,
							to: ['css', 'js'],
						},
						output: {
							file: 'gulp/version.json',
						},
					})
				)
			)
			.pipe(app.gulp.dest(app.path.build.html))
			.pipe(app.plugins.browsersync.stream())
	);
};
