const burger = document.querySelector('[data-burger');
const nav = document.querySelector('[data-burger-nav]');

if (burger) {
  burger.addEventListener('click', () => {
    document.body.classList.toggle('_no-scroll');
    nav.classList.toggle('nav--active');
    burger.classList.toggle('burger--active');
  });
}
