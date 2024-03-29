export const initScrollLinks = () => {
  const scrollLinks = document.querySelectorAll('a[data-scroll-link]');

  const scrollingOnClick = (e) => {
    const link = e.target;
    const headerHeight = document.querySelector('.header').offsetHeight;

    if (
      link.dataset.scrollLink
      && document.querySelector(link.dataset.scrollLink)
    ) {
      const gotoBlock = document.querySelector(link.dataset.scrollLink);
      // If the link is clicked while opening the burger menu.
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top
        + window.pageYOffset
        - headerHeight;

      const burger = document.querySelector('[data-burger');

      if (burger) {
        const nav = document.querySelector('.main-nav');

        if (
          burger.classList.contains('_active')
          || nav.classList.contains('_active')
        ) {
          document.body.classList.remove('_no-scroll');
          nav.classList.remove('_active');
          burger.classList.remove('_active');
        }
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: 'smooth',
      });
      e.preventDefault();
    }
  };

  if (scrollLinks.length > 0) {
    scrollLinks.forEach((link) => {
      link.addEventListener('click', scrollingOnClick);
    });
  }
};
