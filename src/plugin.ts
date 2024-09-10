import { PluginOption } from "vite";
import { writeFileSync } from "fs";
import { join } from "path";

export interface ICwvOptions {
  /** 自动生成版本检测文件的文件名 */
  appVersionFile?: string;
  /** 文件输出的目录 */
  outDir?: string;
}

const _options: ICwvOptions = {
  appVersionFile: "appVersion.json",
  outDir: "dist",
};

function formatCurrentTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export default function cwv(options?: ICwvOptions): PluginOption {
  const appVersionFile =
    (options && options.appVersionFile) || _options.appVersionFile;
  const outputDir = (options && options.outDir) || _options.outDir;

  return {
    name: "vite-plugin-cwv",

    closeBundle() {
      const env = process.env.NODE_ENV;
      if (env !== "production") return;

      const timestamp = new Date().getTime();

      const filePath = join(outputDir!, appVersionFile!);
      const jsonContent = JSON.stringify(
        {
          timestamp,
          time: formatCurrentTime(),
          version: timestamp,
        },
        null,
        2
      );

      console.log(filePath, jsonContent);

      try {
        writeFileSync(filePath, jsonContent, "utf8");
        console.log(`Created ${filePath}`);
      } catch (error) {
        console.error(`Failed to create ${filePath}:`, error);
      }
    },
  };
}
