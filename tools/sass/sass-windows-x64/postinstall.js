"use strict";

const { name, os, cpu } = require("./package.json");

if (os && !os.includes(process.platform)) {
  throw new Error(
    `${name} does not support the platform you are using. You are using: "${
      process.platform
    }" and ${name} supports: ${os.join(
      ","
    )}. If you think this is a mistake, please contact Origami or open an issue on https://github.com/Financial-Times/sass/issues`
  );
}

if (cpu && !cpu.includes(process.arch)) {
  throw new Error(
    `${name} does not support the cpu you are using. You are using: "${
      process.arch
    }" and ${name} supports: ${cpu.join(
      ","
    )}. If you think this is a mistake, please contact Origami or open an issue on https://github.com/Financial-Times/sass/issues`
  );
}
