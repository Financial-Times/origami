"use strict";

const axios = require("axios").default;
const decompress = require("decompress");
const execa = require("execa");
const path = require("path");

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

  for (const platform of platforms) {
    const extension = platform.startsWith("windows") ? "zip" : "tar.gz";
    const { data: archive } = await axios.get(
      `https://github.com/sass/dart-sass/releases/download/${version}/dart-sass-${version}-${platform}.${extension}`,
      {
        responseType: "arraybuffer"
      }
    );

    const destination = path(__dirname, `sass-${platform}`);
    await decompress(archive, destination);
    await execa.command(
      `npm version --no-git-tag-version --force --allow-same-version ${version}`,
      {
        cwd: destination
      }
    );
  }

  await execa.command(
    `npm version --no-git-tag-version --force --allow-same-version ${version}`,
    {
      cwd: __dirname
    }
  );
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
