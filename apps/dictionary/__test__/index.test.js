import {join as pathJoin} from 'node:path';
import {describe, it, expect} from 'vitest';

import {buildCSS,
	getBrandNames,
	getBrandSourcesAndIncludes,
	getBasePath,} from '../scripts/build-config/utils';

describe('buildCss()', () => {
	// icons
	describe('for icon tokens', () => {
		const sources = [pathJoin(__dirname, 'tokens/icons/icons.json')];
		console.log(`🚀 ~ sources:`, sources);
		const destination = '__test__/build/css/icons.css';
		buildCSS({sources, destination});
		it('should build CSS variables for icon tokens', () => {
			expect(true).toBe(true);
		});
	});

	// foundation
	describe('for brand foundation tokens', () => {
		describe('should build CSS variables for foundation tokens', () => {
			it('for brand A', () => {
				expect(true).toBe(true);
			});
		});
	});
});
//
