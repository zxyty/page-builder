/* eslint-disable func-names */
const path = require("path");

function CleanHtmlRel(options) {
  // 使用 options 设置插件实例……
}

CleanHtmlRel.prototype.apply = function(compiler) {
  compiler.plugin("emit", function(compilation, callback) {
    const htmlRelFiles = Object.keys(compilation.assets)
      .map(c => {
        if (path.extname(c) === ".html") {
          return c;
        }
        return null;
      })
      .filter(c => c);

    htmlRelFiles.forEach((c, i, arr) => {
      let oldHtmlSource = compilation.assets[c].source();

      const otherFiles = arr.filter(a => a !== c);

      otherFiles.forEach(o => {
        // replace 其他不相干的依赖
        const baseFileName = path.basename(o, ".html");
        const scriptReg = new RegExp(
          `<script type="text/javascript" src="${baseFileName}\.[a-z0-9]+?\.js"></script>`
        );
        oldHtmlSource = oldHtmlSource.replace(scriptReg, "");
      });

      otherFiles.forEach(o => {
        // replace 其他不相干的依赖
        const baseFileName = path.basename(o, ".html");
        const scriptReg = new RegExp(
          `<link rel="stylesheet" href="${baseFileName}.css">`
        );
        oldHtmlSource = oldHtmlSource.replace(scriptReg, "");
      });

      compilation.assets[c] = {
        source() {
          return oldHtmlSource;
        },
        size() {
          return oldHtmlSource.length;
        }
      };
    });

    callback();
  });
};

module.exports = CleanHtmlRel;
