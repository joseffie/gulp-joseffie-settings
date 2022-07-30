export const server = (done) => {
  $.plugins.browsersync.init({
    server: {
      baseDir: $.path.buildFolder,
    },
    notify: false,
    port: 3000,
  });

  done();
};
