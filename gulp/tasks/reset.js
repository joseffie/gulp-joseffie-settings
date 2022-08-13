export const reset = async () => {
  const deletedDirectoryPaths = $.plugins.del([$.paths.buildFolder]);

  return (
    deletedDirectoryPaths,
    console.log(
      $.plugins.chalk.bold(
        `${$.plugins.chalk.yellow('Deleted directories:')}\n> ${deletedDirectoryPaths.join('\n')}`,
      ),
    )
  );
};
