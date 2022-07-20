import browsersync from 'browser-sync';

export const server = (done) => {
  browsersync.create().init({
    server: {
      baseDir: app.path.buildFolder,
    },
    files: [
      `${app.path.build.html}/*.html`,
      `${app.path.build.css}/*.css`,
      `${app.path.build.js}/*.js`,
      {
        match: `${app.path.build.images}/**/*`,
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
