import { isWebp } from './helpers/is.js';

isWebp((support) => {
  if (support === true) {
    document.body.classList.add('webp');
  } else {
    document.body.classList.add('no-webp');
  }
});

import '../../components/components.js';
