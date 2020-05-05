"use strict";

module.exports = {
   plugins: [
      "stylelint-scss",
      "stylelint-order"
   ],
   rules: {
      "scss/at-import-no-partial-leading-underscore": true,
      "scss/at-import-partial-extension-whitelist": ["test"],
      "scss/at-extend-no-missing-placeholder": true,
      "scss/at-function-pattern": "^[a-z_][a-zA-Z0-9_\\-]+$",
      "scss/percent-placeholder-pattern": "^[a-z0-9_\\-]+$",
      "scss/at-mixin-pattern": "^[a-z_][a-zA-Z0-9_\\-]+$",
      "scss/dollar-variable-pattern": "^[a-z_][a-zA-Z0-9_\\-]+$",
      "selector-id-pattern": "^[a-z0-9_\\-]+$",
      "no-extra-semicolons": true,
      "order/order": [
         {
            "type": "at-rule",
            "name": "extend"
         },
         {
            "type": "at-rule",
            "name": "include"
         },
         "declarations"
      ],
      "at-rule-blacklist": ["debug"],
      "selector-max-id": 0,
      "block-closing-brace-newline-after": [
         "always",
         {
            "ignoreAtRules": [
               "if",
               "else"
            ]
         }
      ],
      "block-no-empty": true,
      "property-no-unknown": [true, {
         "checkPrefixed": true
      }],
      "block-opening-brace-space-before": "always",
      "color-hex-length": "long",
      "color-hex-case": "lower",
      "color-no-invalid-hex": true,
      "declaration-bang-space-before": "always",
      "declaration-bang-space-after": "never",
      "declaration-block-no-duplicate-properties": true,
      "declaration-block-trailing-semicolon": "always",
      "declaration-colon-space-after": "always",
      "declaration-colon-space-before": "never",
      "no-duplicate-at-import-rules": true,
      "declaration-no-important": true,
      "declaration-property-value-blacklist": {
         "border": [
            "none"
         ],
         "border-top": [
            "none"
         ],
         "border-right": [
            "none"
         ],
         "border-bottom": [
            "none"
         ],
         "border-left": [
            "none"
         ]
      },
      "property-no-vendor-prefix": true,
      "value-no-vendor-prefix": true,
      "selector-no-vendor-prefix": true,
      "media-feature-name-no-vendor-prefix": true,
      "at-rule-no-vendor-prefix": true,
      "function-comma-space-after": "always-single-line",
      "function-parentheses-space-inside": "never",
      "indentation": "tab",
      "max-nesting-depth": [3, {
         "ignore": ["blockless-at-rules"]
      }],
      "media-query-list-comma-space-after": "always",
      "media-feature-colon-space-after": "always",
      "no-missing-end-of-source-newline": true,
      "number-leading-zero": "always",
      "number-no-trailing-zeros": true,
      "selector-class-pattern": "^[a-z0-9_\\-]+$",
      "selector-id-pattern": "^[a-z0-9_\\-]+$",
      "selector-list-comma-newline-after": "always",
      "selector-list-comma-space-after": "always-single-line",
      "selector-no-qualifying-type": true,
      "shorthand-property-no-redundant-values": true,
      "value-list-comma-space-after": "always"
   }
};
