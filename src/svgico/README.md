# SVG

This is the folder with the SVG source files.

The `sprite` gulp task is divided into single-color and multi-color sprites. For correct operation, add single-color icons to the `mono` folder, multi-color icons to `multi`.

Gulp converts these icons into an SVG sprite using the `npm run sprite` script, which must be written to the console. If you don't need to use SVG as a sprite, it's better to move them to `src/img`.

How to use the SVG sprite is described in the README.md at the root of the project.
