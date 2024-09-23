import '../../main.css';

type Provider = 'apple' | 'google';

const providerToTitle: Record<Provider, string> = {
	apple: 'Apple',
	google: 'Google'
}
export interface SocialSignInProps {
	provider: Provider
}

export const SocialSignIn = (props: SocialSignInProps) => {
	return (<a className={`o3-social-sign-in-button o3-social-sign-in-button--${props.provider}`}>Sign up with {providerToTitle[props.provider]}</a>)
}