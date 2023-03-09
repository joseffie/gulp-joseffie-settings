import svg4everybody from 'svg4everybody';

import initWebp from './helpers/initWebp.js';
import ready from './helpers/DOM/ready.js';

import {
  Accordion, Header, Dropdown, initBurgerMenu,
} from '@/components/components.js';

initWebp((support) => {
  document.body.classList.add(support === true ? 'webp' : 'no-webp');
});

// Factories class based plugins
Accordion('.accordion');
Header('.header');
Dropdown('.dropdown');

ready(() => {
  initBurgerMenu();
  svg4everybody();
});
