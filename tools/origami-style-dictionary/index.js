#!/usr/bin/env node

import { buildDictionaryForBrands } from './config/default-style-dictionary.js';

(async () => {
    await buildDictionaryForBrands(['core', 'internal', 'whitelabel']);
})();
