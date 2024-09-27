type Provider = 'apple' | 'google';

const providerToTitle: Record<Provider, string> = {
	apple: 'Apple',
	google: 'Google',
};

export interface SocialSignInProps {
	provider: Provider,
	text?: string
}

export const SocialSignIn = (props: SocialSignInProps) => {
	const providerId = props.provider === 'apple' ? 'appleid-signin' : 'gSignInWrapper';
	const defaultCopy = `Sign in with ${providerToTitle[props.provider]}`

	return (
		<button id={providerId} className={`o3-social-sign-in-button o3-social-sign-in-button--${props.provider}`}>
			<span
				className="o3-social-sign-in-button__copy">
				{props.text ? props.text : defaultCopy}
			</span>
		</button>);
};