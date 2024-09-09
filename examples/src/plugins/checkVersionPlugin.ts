import check from "vite-plugin-cwv/check";
export default {
  install: () => {
    check({
      interval: 5,
    });
  },
};
