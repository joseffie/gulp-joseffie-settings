// Checking the browser for Webp support.
// Required for the Gulp plugin that converts images to webp format.
function isWebp(callback) {
  let webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}

isWebp((support) => {
  if (support == true) {
    document.body.classList.add('webp');
  } else {
    document.body.classList.add('no-webp');
  }
});

// Import components
import '../../components/components.mjs';
