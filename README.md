# vite-plugin-libcss

**Disclaimer:** This plugin is a fork from https://github.com/wxsms/vite-plugin-libcss.

This plugin will inject css into bundled js file using `import` statement like this:

```js
// bundled js file, with import css at top (if any)
import "./style.css";
// rest of the file
// ...
```

Install:

```
npm i -D @bimdata/vite-plugin-libcss
```

Usage:

```js
// vite.config.js
import libCss from "@bimdata/vite-plugin-libcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // ... (any other plugins)
    libCss()
  ],
});
```

Note that this plugin will only work in [library-mode](https://vitejs.dev/guide/build.html#library-mode)
with an `es` format build.
