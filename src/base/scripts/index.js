import svg4everybody from 'svg4everybody';

import initWebp from './helpers/initWebp.js';
import ready from './helpers/DOM/ready.js';
import matchWidthResize from './helpers/matchWidthResize.js';

import Accordion from '@/components/accordion/accordion.js';

initWebp((support) => {
  const addBodyClass = document.body.classList.add;
  return support === true ? addBodyClass('webp') : addBodyClass('no-webp');
});

// Factories class based plugins
Accordion('.accordion');

import components from '../../components/components.js';

ready(() => {
  components.burger.initBurgerMenu();
  components.header.setHeaderHeight();

  svg4everybody();
});

// Do something on viewport width resize
matchWidthResize(() => {
  components.header.setHeaderHeight();
});
