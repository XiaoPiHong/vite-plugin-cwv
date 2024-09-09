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
