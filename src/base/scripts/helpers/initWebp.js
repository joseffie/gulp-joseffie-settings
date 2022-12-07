const initWebp = (callback) => {
  const webP = new Image();

  webP.onerror = () => {
    callback(webP.height === 2);
  };

  webP.onload = webP.onerror;

  webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
};

export default initWebp;
