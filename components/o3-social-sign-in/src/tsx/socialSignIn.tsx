import '../../main.css';

type Provider = 'apple' | 'google';

const providerToTitle: Record<Provider, string> = {
	apple: 'Apple',
	google: 'Google'
}

type Flow = 'signin' | 'signup';
export interface SocialSignInProps {
	provider: Provider,
	flow: Flow
}

export const SocialSignIn = (props: SocialSignInProps) => {
	const providerId = props.provider === 'apple' ? 'appleid-signin' : 'gSignInWrapper';
	const flowCopy = props.flow === 'signin' ? 'in' : 'up';

	return (<a id={providerId} className={`o3-social-sign-in-button o3-social-sign-in-button--${props.provider}`}>Sign {flowCopy} with {providerToTitle[props.provider]}</a>)
}