import {SocialSignIn} from '../src/tsx/socialSignIn';

export const  SocialSignInStory ={
	args: {
		provider: 'apple'
	},
	render: (props) => <SocialSignIn {...props }/>
}