const chroma = require('chroma-js');

const tokens = {
  "color": {
    "black": { "value": "#000000" },
    "white": { "value": "#ffffff" },
    "oxford": {
      "value": "#0f5499",
      "tones": [30, 40, 50, 60, 70, 80, 90, 100],
    },
    "teal": {
      "value": "#0d7680",
      "tones": [20, 30, 40, 50, 60, 70, 80, 90, 100]
    },

    "lemon": { "value": "#ffec1a" },
    "slate": { "value": "#262a33" },
    'slate-white-15': { "value": "#dedfe0" },
    'slate-white-5': { "value": "#f4f4f5" },

    "jade": { "value": "#00994d" },
    "crimson": { "value": "#cc0000" },
    "mandarin": { "value": "#ff8833" },


    // @todo keep these ft.com colours for logos and labels?
    "paper": { "value": "#fff1e5" },
    "ft-pink": { "value": "#fcd0b1" },
    "ft-grey": { "value": "#333333" },
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
          value: chroma(token.value).set('hsv.v', tone / 100).hex("rgb")
        };
      });
    }
  }
}

module.exports = tokens;
