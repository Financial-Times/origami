import {readFileSync, rmSync} from 'node:fs';
import {join as pathJoin} from 'node:path';
import {describe, it, expect, vi} from 'vitest';

import {getBrandNames} from '../scripts/build-config/utils';

import {
	buildIconCSS,
	buildBrandForCSS,
	buildComponentTokens,
	buildToolingMetaTokens,
	buildToolingIconTokens,
} from '../scripts/build-config/buildFunctions';

describe('buildCss()', () => {
	const destinationPrefix = '__test__/build/css';
	const buildPath = 'build/css';
	const brands = getBrandNames();

	rmSync(pathJoin(__dirname, buildPath), {recursive: true, force: true});

	describe('for icon tokens', () => {
		buildIconCSS(destinationPrefix + '/icons.css');
		const iconsOutput = readFileSync(
			pathJoin(__dirname, buildPath, 'icons.css'),
			{encoding: 'utf-8'}
		);
		it('should build CSS variables for icon tokens', () => {
			expect(iconsOutput).toMatchSnapshot();
		});
	});

	describe('for brand foundation tokens', () => {
		describe('should build CSS variables for foundation tokens', () => {
			buildBrandForCSS(
				vi.fn(brand => `${destinationPrefix}/tokens/${brand}/_variables.css`)
			);
			it.each(brands)('for %s brand', brand => {
				const brandOutput = readFileSync(
					pathJoin(__dirname, buildPath, 'tokens', brand, '_variables.css'),
					{encoding: 'utf-8'}
				);
				expect(brandOutput).toMatchSnapshot();
			});
		});
	});

	describe('should build CSS variables for', () => {
		const getDestination = vi.fn(
			(brand, component) =>
				`${destinationPrefix}/tokens/${brand}/${component}/_variables.css`
		);
		describe('o3-button component tokens', () => {
			buildComponentTokens('o3-button', getDestination);
			it.each(brands)('for %s brand', brand => {
				const brandOutput = readFileSync(
					pathJoin(
						__dirname,
						buildPath,
						'tokens',
						brand,
						'o3-button',
						'_variables.css'
					),
					{encoding: 'utf-8'}
				);
				expect(brandOutput).toMatchSnapshot();
			});
		});
	});

	describe('for Astro build', () => {
		describe('should build CSS foundation variables for Astro', () => {
			buildToolingMetaTokens(
				vi.fn(
					brand => `${destinationPrefix}/astro/tokens/${brand}/_variables.js`
				)
			);
			it.each(brands)('for %s brand', brand => {
				const brandOutput = readFileSync(
					pathJoin(
						__dirname,
						buildPath,
						'astro',
						'tokens',
						brand,
						'_variables.js'
					),
					{encoding: 'utf-8'}
				);
				expect(brandOutput).toMatchSnapshot();
			});

			it('should build icons CSS variables for Astro', () => {
				buildToolingIconTokens(
					`${destinationPrefix}/astro/icons/_variables.js`
				);
				const iconsOutput = readFileSync(
					pathJoin(__dirname, buildPath, 'astro', 'icons', '_variables.js'),
					{encoding: 'utf-8'}
				);
				expect(iconsOutput).toMatchSnapshot();
			});
		});
	});
});
