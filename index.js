const { readFileSync, writeFileSync } = require("fs");
const { resolve } = require("path");

let viteConfig;

module.exports = function () {
  return {
    name: "lib-css",
    apply: "build",
    enforce: "post",

    configResolved (resolvedConfig) {
      viteConfig = resolvedConfig;
    },

    writeBundle (option, bundle) {
      if (!viteConfig.build || !viteConfig.build.lib) {
        // only for lib build
        console.warn("@bimdata/vite-plugin-libcss only works in lib mode.")
        return;
      }
      if (option.format !== "es") {
        // only for es built
        return;
      }

      const files = Object.keys(bundle);
      const cssFile = files.find(v => v.endsWith(".css"));
      if (!cssFile) return;

      for (const file of files) {
        // only for entry
        if (!bundle[file].isEntry) continue;

        const outDir = viteConfig.build.outDir || "dist";
        const filePath = resolve(viteConfig.root, outDir, file);
        const data = readFileSync(filePath, { encoding: "utf8" });
        writeFileSync(filePath, `import "./${cssFile}";\n${data}`);
      }
    },
  };
};
