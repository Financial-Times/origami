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
	...baseTransformers,
	'Origami/tintGroup',
]

export {
	transformers as webTransformers,
	toolingTransformers,
};
