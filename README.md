# vite-plugin-cwv

这是一个用于 web 应用版本检测的 vite 插件。

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

## 案例

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
/** App.vue */
<script setup lang="ts">
import check from "vite-plugin-cwv/check";

check({
  /** 10秒检测一次 */
  interval: 10,
  checkCondition: () => {
    /** 生产环境才开启版本检测 */
    return import.meta.env.PROD;
  },
  diffVersionCb: () => {
    const newV = window.confirm("检测到新版本,是否刷新页面?");
    /** 检测到新版本后重新加载 */
    if (newV) window.location.reload();
  },
});
</script>
```

## Props

### ICwvOptions 配置

| 属性名           | 类型     | 默认值            | 描述                           |
| ---------------- | -------- | ----------------- | ------------------------------ |
| `appVersionFile` | `string` | `appVersion.json` | 自动生成版本检测文件的文件名。 |
| `outDir`         | `string` | `dist`            | 文件输出的目录。               |

### ICheckOptions 配置

| 属性名               | 类型            | 默认值             | 描述                                           |
| -------------------- | --------------- | ------------------ | ---------------------------------------------- |
| `checkCondition`     | `() => boolean` | -                  | 需要开启检测的条件函数，返回 `true` 时为开启。 |
| `diffVersionCb`      | `() => void`    | `()=>{}`           | 版本不一致时的回调函数。                       |
| `interval`           | `number`        | `30`               | 轮询间隔时间，单位为秒。                       |
| `appVersionFilePath` | `string`        | `/appVersion.json` | 指定对比文件请求地址（应对资源转发的情况）。   |

## Keywords

- vite
- plugin
- check
- web app
- version
