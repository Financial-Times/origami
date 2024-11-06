import StyleDictionaryPackage from 'style-dictionary';
import {register} from '@tokens-studio/sd-transforms';

import {brandClasses} from '../formatters/css/brand-classes.js';
import {toolingFormat} from '../formatters/js/tooling.js';
import {transformSVG} from '../transforms/transformSVG.js';
import {tintGroup} from '../transforms/tint-group.js';
import {privatePrefix} from '../transforms/private-prefix.js';

register(StyleDictionaryPackage);

StyleDictionaryPackage.registerTransform({
	name: 'name/origamiPrivatePrefix',
	type: 'name',
	transform: privatePrefix,
});

StyleDictionaryPackage.registerFormat({
	name: 'css/brand/classes',
	format: brandClasses,
});

StyleDictionaryPackage.registerFormat({
	name: 'tooling/esm',
	format: toolingFormat,
});

StyleDictionaryPackage.registerTransform({
	name: 'value/transformSVG',
	type: 'value',
	transform: transformSVG,
	filter: token => token.type === 'asset',
	transitive: true,
});

StyleDictionaryPackage.registerTransform({
	name: 'Origami/tintGroup',
	type: 'attribute',
	filter: token => {
		return (
			token.type === 'color' && /palette-[a-zA-Z]+-[0-9]{1,3}$/.test(token.name)
		);
	},
	transform: tintGroup,
});

StyleDictionaryPackage.registerTransform({
	name: 'value/figma-shadow-shorthand',
	type: 'value',
	transitive: true,
	filter: token => token.type === 'shadow',
	transform: token => {
		const value = token.value;
		const [type, x, y, blur, spread, color] = value.split(' ');
		return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
	},
});

const StyleDictionaryPackageWithTransforms = StyleDictionaryPackage;
export {StyleDictionaryPackageWithTransforms};
