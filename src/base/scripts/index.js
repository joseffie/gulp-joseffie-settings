import { isWebp } from './helpers/is.js';
import matchWidthResize from './helpers/matchWidthResize.js';

isWebp((support) => {
  if (support === true) {
    document.body.classList.add('webp');
  } else {
    document.body.classList.add('no-webp');
  }
});

import components from '../../components/components.js';

components.burger.initBurgerMenu();
components.header.setHeaderHeight();

matchWidthResize(() => {
  // Update header height CSS variable on resize width screen
  components.header.setHeaderHeight();
});
