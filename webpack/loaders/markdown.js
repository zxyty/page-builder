module.exports = function loader(src) {
  return `module.exports = ${JSON.stringify(src)};`;
};
