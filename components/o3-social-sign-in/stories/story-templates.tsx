import {SocialSignIn, SocialSignInProps} from '../src/tsx/socialSignIn';

export const  SocialSignInStory ={
	args: {
		provider: 'apple',
	},
	render: (props: SocialSignInProps) => <SocialSignIn {...props }/>
}