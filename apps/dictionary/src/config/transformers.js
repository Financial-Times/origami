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
	'Origami/tintGroup',
	...baseTransformers,
]

export {
	transformers as webTransformers,
	toolingTransformers,
};
