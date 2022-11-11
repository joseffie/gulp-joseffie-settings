export const reset = async () => {
  const deletedDirectoryPaths = $.plugins.del([$.paths.buildFolder]);
  const msg = $.plugins.chalk;

  // If there are no directories to remove, the function does nothing
  if (deletedDirectoryPaths.join('').length < 1) return 0;

  return (
    deletedDirectoryPaths,
    console.log(
      msg.bold(
        `${msg.yellow('Deleted directories:')}\n${deletedDirectoryPaths.join('\n')}`,
      ),
    )
  );
};
