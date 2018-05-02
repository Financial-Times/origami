import h from '@financial-times/x-engine';
import rules from './concerns/rules';

const YES = '';

const NO = 'not-';

const PREFIX = {
	yes: '',
	no: 'not-',
	verify: 'verify-'
};

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
		modifiers.push(`${PREFIX[props.indicators.canBeSyndicated]}syndicatable`);
	}

	if (props.indicators && props.indicators.canBeDistributed) {
		modifiers.push(`${PREFIX[props.indicators.canBeDistributed]}distributable`);
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
