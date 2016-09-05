const proclaim = require('proclaim');

const eslintConfig = require('.');

proclaim.isInstanceOf(eslintConfig, Object);
proclaim.isInstanceOf(eslintConfig.ecmaFeatures, Object);
proclaim.isInstanceOf(eslintConfig.parserOptions, Object);
proclaim.isInstanceOf(eslintConfig.env, Object);
proclaim.isInstanceOf(eslintConfig.rules, Object);
proclaim.isInstanceOf(eslintConfig.globals, Object);
