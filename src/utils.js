export const timeParser = (seconds) => {
  if (seconds) {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  }
  return 0;
};

export default { timeParser };
