const chroma = require('chroma-js');

const tokens = {
  "color": {
    "paper": {
      "value": "#fff1e5"
    },
    "claret": {
      "value": "#990f3",
      "tones": [30, 40, 50, 60, 70, 80, 90, 100]
    },
    "oxford": {
      "value": "#0f5499",
      "tones": [30, 40, 50, 60, 70, 80, 90, 100],
    },
    "teal": {
      "value": "#0d7680",
      "tones": [20, 30, 40, 50, 60, 70, 80, 90, 100]
    },
    "wheat": { "value": "#f2dfc" },
    "sky": { "value": "#cce6ff" },
    "slate": { "value": "#262a33" },
    "velvet": { "value": "#593380" },
    "mandarin": { "value": "#ff8833" },
    "lemon": { "value": "#ffec1a" },
    "candy": { "value": "#ff7faa" },
    "wasabi": { "value": "#96cc28" },
    "jade": { "value": "#00994d" },
    "crimson": { "value": "#cc0000" },
    "org-b2c": { "value": "#4e96eb" },
    "org-b2c-dark": { "value": "#3a70af" },
    "org-b2c-light": { "value": "#99c6fb" },
    "matisse": { "value": "#355778" },
    "ft-pink": { "value": "#fcd0b1" },
    "ft-grey": { "value": "#333333" },
    "white": { "value": "#ffffff" },
    "black": { "value": "#000000" },
  }
}

// Generate tones
// @todo these are different to o-colors as o-colors produces
// slightly inaccurate hex colours. Either roll these hexes out
// or set them manually - probably the latter if we want design tooling
// to be able to update design tokens.
for (const key in tokens.color) {
  if (Object.hasOwnProperty.call(tokens.color, key)) {
    const token = tokens.color[key];
    if (Array.isArray(token.tones)) {
      token.tones.forEach(tone => {
        tokens.color[`${key}-${tone}`] = {
          value: chroma("#0f5499").set('hsv.v', tone / 100).hex("rgb")
        };
      });
    }
  }
}

module.exports = tokens;
