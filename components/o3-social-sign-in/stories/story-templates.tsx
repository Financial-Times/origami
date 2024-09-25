import {SocialSignIn, SocialSignInProps} from '../src/tsx/socialSignIn';

export const  SocialSignInStory ={
	args: {
		provider: 'apple',
		flow: 'signin'
	},
	render: (props: SocialSignInProps) => <SocialSignIn {...props }/>
}