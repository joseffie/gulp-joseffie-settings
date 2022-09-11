import svg4everybody from 'svg4everybody';

import initWebp from './helpers/initWebp.js';
import ready from './helpers/DOM/ready.js';
import matchWidthResize from './helpers/matchWidthResize.js';

initWebp((support) => {
  const addBodyClass = document.body.classList.add;
  return support === true ? addBodyClass('webp') : addBodyClass('no-webp');
});

import components from '../../components/components.js';

ready(() => {
  components.burger.initBurgerMenu();
  components.header.setHeaderHeight();

  svg4everybody();
});

matchWidthResize(() => {
  // Update header height CSS variable on resize width screen
  components.header.setHeaderHeight();
});
