// This is required to make @testing-library/dom work.
// @testing-library/dom depends on pretty-format and
// pretty-format makes use of `global`...
// -> Line 10 of https://unpkg.com/browse/pretty-format@27.0.2/build/plugins/AsymmetricMatcher.js
// The line in the file above is `var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;`

window.global = window;
