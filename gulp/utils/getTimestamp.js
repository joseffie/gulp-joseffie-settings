import correctNumber from './correctNumber.js';

const getTimestamp = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = correctNumber(now.getMonth() + 1);
  const day = correctNumber(now.getDate());

  return `${year}-${month}-${day}`;
};

export default getTimestamp;
