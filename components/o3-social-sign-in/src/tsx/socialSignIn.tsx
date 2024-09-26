import {AppleIcon, GoogleIcon} from './icons';

type Provider = 'apple' | 'google';

const providerToTitle: Record<Provider, string> = {
	apple: 'Apple',
	google: 'Google',
};

type Flow = 'signin' | 'signup';

export interface SocialSignInProps {
	provider: Provider,
	flow: Flow
}

function isProviderApple(provider: Provider): boolean {
	return provider === 'apple';
}

export const SocialSignIn = (props: SocialSignInProps) => {
	const providerId = isProviderApple(props.provider) ? 'appleid-signin' : 'gSignInWrapper';
	const flowCopy = props.flow === 'signin' ? 'in' : 'up';

	return (
		<button id={providerId} className={`o3-social-sign-in-button o3-social-sign-in-button--${props.provider}`}>
			<span
				className="o3-social-sign-in-button__icon"
				aria-hidden={true}>{isProviderApple(props.provider) ?
				<AppleIcon /> :
				<GoogleIcon />
			}</span>
			<span
				className="o3-social-sign-in-button__copy">
				Sign {flowCopy} with {providerToTitle[props.provider]}
			</span>
		</button>);
};