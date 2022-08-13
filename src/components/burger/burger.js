const burgerMenu = document.querySelector('[data-burger');
const mainNavMenu = document.querySelector('.main-nav');

if (burgerMenu) {
  burgerMenu.addEventListener('click', () => {
    document.body.classList.toggle('_no-scroll');
    mainNavMenu.classList.toggle('_active');
    burgerMenu.classList.toggle('_active');
  });
}
