const delayAnswer = (req, res, next) => {
  setTimeout(next, 150);
};

module.exports = {
  delayAnswer,
};
