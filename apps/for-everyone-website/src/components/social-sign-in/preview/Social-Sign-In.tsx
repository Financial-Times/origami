import {SocialSignIn} from '@financial-times/o3-social-sign-in/esm/socialSignIn';

function SocialSignInPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<div style={{display: 'flex', flexDirection: 'column', gap: 'var(--o3-spacing-4xs)'}}>
			<SocialSignIn provider="apple" />
			<SocialSignIn provider="google" />
			</div>
			<meta itemProp="@preview" />
		</>
	);
}

export const filePath = 'src/components/social-sign-in/preview/Social-Sign-In.tsx';
export {SocialSignInPreview as preview};