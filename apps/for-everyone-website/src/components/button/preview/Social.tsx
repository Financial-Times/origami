import {SocialSignIn} from '@financial-times/o3-social-sign-in';

function SocialSignInPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<>
				<SocialSignIn provider="apple" text="Sign in with Apple" />
				<SocialSignIn provider="google" text="Sign in with Google" />
			</>
			<meta itemProp="@preview" />
		</>
	);
}
export const filePath = 'src/components/button/preview/Social.tsx';

export {SocialSignInPreview as preview};
