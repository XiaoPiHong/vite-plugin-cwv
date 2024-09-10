<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import check from "vite-plugin-cwv";

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

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
