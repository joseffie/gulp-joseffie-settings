import svg4everybody from 'svg4everybody';

import initWebp from './helpers/initWebp.js';
import ready from './helpers/DOM/ready.js';

import Accordion from '@/components/accordion/accordion.js';
import Header from '@/components/header/header.js';
import Dropdown from '@/components/dropdown/dropdown.js';

// Init webp polyfill
initWebp((support) => (support === true
  ? document.body.classList.add('webp')
  : document.body.classList.add('no-webp')));

// Factories class based plugins
Accordion('.accordion');
Header('.header');
Dropdown('.dropdown');

import components from '@/components/components.js';

ready(() => {
  components.burger.initBurgerMenu();
  svg4everybody();
});
