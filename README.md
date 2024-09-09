## 引入

```bash
npm install vite-plugin-cwv --save
```

```bash
yarn add vite-plugin-cwv
```

```bash
pnpm install vite-plugin-cwv --save
```

## vue 例子

```ts
/** vite.config.ts */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import cwv from "vite-plugin-cwv";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), cwv()],
});
```

```ts
/** checkVersionPlugin */
import check from "vite-plugin-cwv/check";
export default {
  install: () => {
    check({
      interval: 5,
      diffVersionCb: () => {
        const newV = window.confirm("检测到新版本,是否刷新页面?");
        if (newV) window.location.reload();
      },
    });
  },
};
```

```ts
/** main.ts */
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import checkVersionPlugin from "./plugins/checkVersionPlugin";

const app = createApp(App);
app.use(checkVersionPlugin);

app.mount("#app");
```
