import h from '@financial-times/x-engine';
import rules from './concerns/rules';

const dynamicModifiers = (props) => {
	const modifiers = [];

	const media = rules('media', props);

	if (media) {
		modifiers.push(`has-${media}`);
	}

	const theme = rules('theme', props);

	if (theme) {
		modifiers.push(theme);
	}

	if (props.indicators && props.indicators.canBeSyndicated) {
		switch (props.indicators.canBeSyndicated) {
			case 'yes':
				modifiers.push('syndicatable');
				break;
			case 'no':
				modifiers.push('not-syndicatable');
				break;
			case 'verify':
				modifiers.push('verify-syndicatable');
				break;
		}
	}

	if (props.indicators && props.indicators.canBeDistributed) {
		switch (props.indicators.canBeDistributed) {
			case 'yes':
				modifiers.push('distributable');
				break;
			case 'no':
				modifiers.push('not-distributable');
				break;
			case 'verify':
				modifiers.push('verify-distributable');
				break;
		}
	}

	return modifiers;
};

export default (props) => {
	// NOTE: Modifier props may be a string rather than a string[] so concat, don't spread.
	const computed = dynamicModifiers(props);
	const variants = [props.type, props.layout].concat(props.modifiers || [], computed);

	const classNames = variants
		.map((mod) => `o-teaser--${mod}`)
		.filter(Boolean)
		.join(' ');

	return (
		<div className={`o-teaser ${classNames} js-teaser`} data-id={props.id}>
			{props.children}
		</div>
	);
};
