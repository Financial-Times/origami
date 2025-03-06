const baseTransformers = [
	'ts/descriptionToComment',
	'color/css',
	'ts/color/modifiers',
	'name/kebab',
	'name/origamiPrivatePrefix',
];

const transformers = [
	...baseTransformers,
	'size/pxToRem',
];

const toolingTransformers = [
	'size/px',
	// 'size/remToPx',
	...baseTransformers,
]

export {
	transformers as sharedTransformers,
	toolingTransformers,
};
