import { h } from '@financial-times/x-engine';
import { media, theme } from './concerns/rules';

const dynamicModifiers = (props) => {
	const modifiers = [];

	const mediaRule = media(props);

	if (mediaRule) {
		modifiers.push(`has-${mediaRule}`);
	}

	const themeRule = theme(props);

	if (themeRule) {
		modifiers.push(themeRule);
	}

	return modifiers;
};

export default (props) => {
	const computed = dynamicModifiers(props);
	// Modifier props may be a string rather than a string[] so concat, don't spread.
	const variants = [props.type, props.layout].concat(props.modifiers, computed);

	const classNames = variants
		.filter(Boolean)
		.map((mod) => `o-teaser--${mod}`)
		.join(' ');

	return (
		<div className={`o-teaser ${classNames} js-teaser`} data-id={props.id} data-trackable={props.dataTrackable}>
			{props.children}
		</div>
	);
};
