#!/usr/bin/env node

import { buildDictionaryForBrand } from './config/default-style-dictionary.js';

buildDictionaryForBrand('core');
buildDictionaryForBrand('internal');
buildDictionaryForBrand('whitelabel');
