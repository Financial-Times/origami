"use strict";

const fs = require("fs");
const path = require("path");

let platformSpecificPackagePath;
if (process.platform === "win32" && process.arch === "x64") {
  platformSpecificPackagePath = require.resolve("@financial-times/sass-windows-x64");
} else if (process.platform === "win32" && process.arch === "ia32") {
  platformSpecificPackagePath = require.resolve("@financial-times/sass-windows-ia32");
} else if (process.platform === "darwin") {
  platformSpecificPackagePath = require.resolve("@financial-times/sass-macos-x64");
} else if (process.platform === "linux" && process.arch === "x64") {
  platformSpecificPackagePath = require.resolve("@financial-times/sass-linux-x64");
} else if (process.platform === "linux" && process.arch === "ia32") {
  platformSpecificPackagePath = require.resolve("@financial-times/sass-linux-ia32");
} else {
  throw new Error(
    "@financial-times/sass does not have a precompiled binary for the platform/architecture you are using. Please contact Origami or open an issue on https://github.com/Financial-Times/sass/issues"
  );
}

const platformSpecificSassPath = path.dirname(platformSpecificPackagePath, 'dart-sass')

// Copy the sass files to the root package (@financial-times/sass).
// We need to copy and not symlink because the dart-sass entrypoint file does 
// not work correctly when used via a symlink which is in another folder.
copyDir(platformSpecificSassPath, __dirname);

// Nodejs does not have a built-in implementation of `cp -R`, so we've built it.
function copyDir(src, dest) {
  const entries = fs.readdirSync(src, {
    withFileTypes: true
  });
  const exists = fs.existsSync(dest);
  if (!exists) {
    fs.mkdirSync(dest);
  }
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// We need to remove the sass entrypoint file if it exists already.
if (fs.existsSync(path.join(__dirname, './sass'))) {
  fs.unlinkSync(path.join(__dirname, './sass'));
}

fs.symlinkSync(path.join(__dirname, 'dart-sass/sass'), path.join(__dirname, './sass'))
