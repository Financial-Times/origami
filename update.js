"use strict";

const axios = require("axios").default;
const decompress = require("decompress");
const execa = require("execa");
const path = require("path");
const fs = require("fs");

const platforms = [
  "linux-ia32",
  "linux-x64",
  "macos-x64",
  "windows-ia32",
  "windows-x64"
];

async function main() {
  const latest = await axios.get(
    "https://api.github.com/repos/sass/dart-sass/releases/latest"
  );

  const version = latest.data.tag_name;

  const rootPackage = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

  for (const platform of platforms) {
    const extension = platform.startsWith("windows") ? "zip" : "tar.gz";
    const { data: archive } = await axios.get(
      `https://github.com/sass/dart-sass/releases/download/${version}/dart-sass-${version}-${platform}.${extension}`,
      {
        responseType: "arraybuffer"
      }
    );

    const destination = path.resolve(__dirname, `sass-${platform}`);
    await decompress(archive, destination);
    rootPackage.optionalDependencies[`@financial-times/sass-${platform}`] = version;
  }

  fs.writeFileSync('./package.json', JSON.stringify(rootPackage), "utf-8");
}

try {
  main();
} catch (error) {
  if (typeof error.toJSON === "function") {
    console.error(error.toJSON());
  } else {
    console.error(error);
  }
}
