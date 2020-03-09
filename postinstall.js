"use strict";

const fs = require("fs");
const path = require("path");

let pathToBinary;
if (process.platform === "win32" && process.arch === "x64") {
  pathToBinary = require("@financial-times/sass-windows-x64");
} else if (process.platform === "win32" && process.arch === "ia32") {
  pathToBinary = require("@financial-times/sass-windows-ia32");
} else if (process.platform === "darwin") {
  pathToBinary = require("@financial-times/sass-macos-x64");
} else if (process.platform === "linux" && process.arch === "x64") {
  pathToBinary = require("@financial-times/sass-linux-x64");
} else if (process.platform === "linux" && process.arch === "ia32") {
  pathToBinary = require("@financial-times/sass-linux-ia32");
} else {
  throw new Error(
    "@financial-times/sass does not have a precompiled binary for the platform/architecture you are using. Please contact Origami or open an issue on https://github.com/Financial-Times/sass/issues"
  );
}

const binaryDestination = "./sass";

if (fs.existsSync(binaryDestination)) {
  fs.unlinkSync(binaryDestination);
}
fs.symlinkSync(path.relative(__dirname, pathToBinary), binaryDestination);
