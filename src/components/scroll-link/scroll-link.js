const scrollLinks = document.querySelectorAll('a[data-scroll-link]');

if (scrollLinks.length > 0) {
  scrollLinks.forEach((scrollLink) => {
    scrollLink.addEventListener('click', scrollingOnClick);
  });

  const scrollingOnClick = (e) => {
    const link = e.target;
    const headerHeight = document.querySelector('.header').offsetHeight;

    if (link.dataset.scrollLink && document.querySelector(link.dataset.scrollLink)) {
      const gotoBlock = document.querySelector(link.dataset.scrollLink);
      const gotoBlockValue =
        gotoBlock.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      // If the link is clicked while opening the burger menu.
      const burger = document.querySelector('[data-burger');

      if (burger) {
        const nav = document.querySelector('.main-nav');

        if (burger.classList.contains('_active') || nav.classList.contains('_active')) {
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
}
