const matchWidthResize = (cb, timeout) => {
  const windowWidthArr = [window.innerWidth];

  return (window.onresize = () => {
    const windowWidth = window.innerWidth;
    const winWidthArrLength = windowWidthArr.length;

    windowWidthArr.push(windowWidth);

    if (
      windowWidthArr[winWidthArrLength]
      !== windowWidthArr[winWidthArrLength - 1]
    ) {
      clearTimeout(timeout);
      timeout = this.setTimeout(cb, 50);
    }
  });
};

export default matchWidthResize;
