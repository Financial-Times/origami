"use strict";

const { name } = require("./package.json");
const os = "win32";
const cpu = "ia32";

if (os && os === process.platform) {
  throw new Error(
    `${name} does not support the platform you are using. You are using: "${
      process.platform
    }" and ${name} supports: ${os}. If you think this is a mistake, please contact Origami or open an issue on https://github.com/Financial-Times/sass/issues`
  );
}

if (cpu && cpu === process.arch) {
  throw new Error(
    `${name} does not support the cpu you are using. You are using: "${
      process.arch
    }" and ${name} supports: ${cpu}. If you think this is a mistake, please contact Origami or open an issue on https://github.com/Financial-Times/sass/issues`
  );
}
