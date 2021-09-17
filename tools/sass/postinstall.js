"use strict";

const fs = require("fs");
const path = require("path");

let platformSpecificPackagePath;
const windows64bit = process.platform === "win32" && process.arch === "x64";
const windows32bit = process.platform === "win32" && process.arch === "ia32";
const mac = process.platform === "darwin";
const linux64bit = process.platform === "linux" && process.arch === "x64";
const linux32bit = process.platform === "linux" && process.arch === "ia32";

if (windows64bit) {
  platformSpecificPackagePath = require.resolve(
    "@financial-times/sass-windows-x64"
  );
} else if (windows32bit) {
  platformSpecificPackagePath = require.resolve(
    "@financial-times/sass-windows-ia32"
  );
} else if (mac) {
  platformSpecificPackagePath = require.resolve(
    "@financial-times/sass-macos-x64"
  );
} else if (linux64bit) {
  platformSpecificPackagePath = require.resolve(
    "@financial-times/sass-linux-x64"
  );
} else if (linux32bit) {
  platformSpecificPackagePath = require.resolve(
    "@financial-times/sass-linux-ia32"
  );
} else {
  throw new Error(
    "@financial-times/sass does not have a precompiled binary for the platform/architecture you are using. Please contact Origami or open an issue on https://github.com/Financial-Times/sass/issues"
  );
}

const platformSpecificSassPath = path.join(
  path.dirname(platformSpecificPackagePath),
  "dart-sass"
);

// Create our own sass entrypoint which uses absolute paths to the dartvm and snapshot.
// This will ensure it works when symlinked to, which the entrypoint file in dart-sass
// does not support on macos.
const windowsEntrypoint = `
@echo off
REM This script drives the standalone dart-sass package, which bundles together a
REM Dart executable and a snapshot of dart-sass.

set SCRIPTPATH=%~dp0
set arguments=%*
"${path.join(platformSpecificSassPath, "/src/dart.exe")}" "${path.join(
  platformSpecificSassPath,
  "/src/sass.snapshot"
)}" %arguments%`;

const linuxAndMacEntrypoint = `
#!/bin/sh
exec "${path.join(platformSpecificSassPath, "/src/dart")}" "${path.join(
  platformSpecificSassPath,
  "/src/sass.snapshot"
)}" "$@"`;

const windows = windows64bit || windows32bit;
const entrypoint = windows ? windowsEntrypoint : linuxAndMacEntrypoint;

fs.writeFileSync(path.join(__dirname, "sass.bat"), entrypoint, {
  encoding: "utf-8",
  mode: 0o777
});
