export const getHeaderHeight = () => {
  const header = document.querySelector('.page__header');
  const headerHeight = header.offsetHeight;

  return `${headerHeight}px`;
};

export const setHeaderHeight = () => {
  document.documentElement.style.setProperty('--header-height', getHeaderHeight());
};
