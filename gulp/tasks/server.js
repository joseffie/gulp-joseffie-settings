import browsersync from 'browser-sync';

export const server = (done) => {
  browsersync.create().init({
    server: {
      baseDir: $.path.buildFolder,
    },
    files: [
      `${$.path.build.html}/*.html`,
      `${$.path.build.css}/*.css`,
      `${$.path.build.js}/*.js`,
      {
        match: `${$.path.build.images}/**/*`,
        fn() {
          this.reload();
        },
      },
    ],
    notify: false,
    port: 3000,
  });

  done();
};
