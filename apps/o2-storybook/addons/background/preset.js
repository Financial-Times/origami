function config(entry = []) {
  return [...entry, require.resolve("./src/preset/preview")];
}

 module.exports = { config }
