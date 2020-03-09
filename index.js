"use strict";

module.exports = (function() {
  try {
    return require("@financial-times/sass-windows-x64");
  } catch {
    try {
      return require("@financial-times/sass-windows-ia32");
    } catch {
      try {
        return require("@financial-times/sass-linux-x64");
      } catch {
        try {
          return require("@financial-times/sass-linux-ia32");
        } catch {
          try {
            return require("@financial-times/sass-macos-x64");
          } catch {
            throw new Error(
              "oax does not have a precompiled binary for the platform/architecture you are using. Please contact Origami or open an issue on https://github.com/Financial-Times/oax/issues"
            );
          }
        }
      }
    }
  }
})();
