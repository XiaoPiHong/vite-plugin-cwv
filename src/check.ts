export interface ICheckOptions {
  /** 需要开启检测的条件函数，true为开启 */
  checkCondition: () => boolean;
  /** 版本不一致的回调 */
  diffVersionCb?: () => void;
  /** 多少秒轮询一次 */
  interval?: number;
  /** appVersionFilePath */
  /** 指定对比文件请求地址（应对资源转发的情况） */
  appVersionFilePath?: string;
}

const _options: Omit<ICheckOptions, "checkCondition"> = {
  diffVersionCb: () => {},
  interval: 30,
  appVersionFilePath: "/appVersion.json",
};

const versionConfig = {
  /** 是否初始化 */
  init: false,
  /** 版本号 */
  number: null,
  /** 轮训定时器 */
  timer: -1,
};

/** 检测函数 */
function handleCheck(options: ICheckOptions) {
  return new Promise((resolve) => {
    fetch(`${options.appVersionFilePath}?time=${Date.now()}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        /** 拿到最新的版本 */
        const lastVersion = data;
        if (!lastVersion) return;

        if (versionConfig.init) {
          if (versionConfig.number! < lastVersion.version) {
            options.diffVersionCb!();
            resolve(lastVersion);
          }
          return;
        }

        /** 初始化配置 */
        versionConfig.init = true;
        versionConfig.number = lastVersion.version;
      });
  });
}

export default function check(options: ICheckOptions) {
  const mergeOptions = Object.assign(_options, options);
  /** 只有生产环境才会轮训 */
  if (!mergeOptions.checkCondition()) return;
  /** 轮训版本文件 */
  versionConfig.timer = window.setInterval(() => {
    handleCheck(mergeOptions).then(() => {
      clearInterval(versionConfig.timer);
    });
  }, 1000 * mergeOptions.interval!);
}
