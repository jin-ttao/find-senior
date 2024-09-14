export const delayAnimation = function(ms) {
  return new Promise((resolve) => setTimeout(() => {
    resolve();
  }, ms));
};
