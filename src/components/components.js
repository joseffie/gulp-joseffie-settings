import { initBurgerMenu } from './burger/burger.js';
import { getHeaderHeight, setHeaderHeight } from './header/header.js';
// import { initScrollLinks } from './scroll-link/scroll-link.js';
// import { overlayAdd, overlayRemove } from './overlay/overlay.js';

const components = {
  burger: {
    initBurgerMenu,
  },
  header: {
    getHeaderHeight,
    setHeaderHeight,
  },
  // scrollLinks: {
  //   initScrollLinks,
  // },
  // overlay: {
  //   overlayAdd,
  //   overlayRemove,
  // },
};

export default components;
