export const reset = () => {
  return app.plugins.del(app.path.clean);
};
