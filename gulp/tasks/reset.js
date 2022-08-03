export const reset = async function () {
  const deletedDirectoryPaths = $.plugins.del([$.path.buildFolder]);

  return (
    deletedDirectoryPaths,
    console.log(`Deleted directories:\n=> ${deletedDirectoryPaths.join('\n')}`)
  );
};
