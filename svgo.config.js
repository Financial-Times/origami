// Temporary. Used to optimise token icons.
export default {
  plugins: [
    'removeStyleElement',
    'removeScriptElement',
    'reusePaths',
    'removeOffCanvasPaths',
    'sortAttrs',
    'removeRasterImages',
    'removeDimensions',
    {
      name: 'removeAttributesBySelector',
      params: {
        selector: '[fill]',
        attributes: "fill"
      },
    },
    {
      name: 'removeAttributesBySelector',
      params: {
        selector: '[fill-rule]',
        attributes: "fill-rule"
      },
    },
  ],
};
