export interface FollowButtonProps {
	label: string;
	theme?: string;
	// an optional csrf element
	csrf?: JSX.Element;
	// for tracking props that aren't appropriate in origami
	extraFormProps: any;
	// for tracking props that aren't appropriate in origami
	extraButtonProps: any;
	conceptName: string;
	conceptId: string;
	followAction: string;
	unfollowAction: string;
	jsFollowAction: string;
	jsUnfollowAction: string;
	followed: boolean;
}

export default function FollowButton({
	conceptName,
	csrf,
	label,
	theme,
	extraFormProps,
	extraButtonProps,
	followed,
	followAction,
	unfollowAction,
	jsFollowAction,
	jsUnfollowAction,
}: FollowButtonProps) {
	let buttonLabel = followed
		? `Remove ${conceptName} from myFT`
		: `Add ${conceptName} to myFT`;

	return (
		<form
			className={`myft-concept-button myft-concept-button--follow ${
				theme ? `myft-concept-button--${theme}` : ''
			}`}
			data-o-component="myft-concept-button"
			data-myft-concept-button-concept={conceptName}
			method="GET"
			data-myft-concept-button-js-follow-action={jsFollowAction}
			data-myft-concept-button-js-unfollow-action={jsUnfollowAction}
			data-myft-concept-button-js-action={
				followed ? jsUnfollowAction : jsFollowAction
			}
			data-myft-concept-button-follow-action={followAction}
			data-myft-concept-button-unfollow-action={unfollowAction}
			action={followed ? unfollowAction : followAction}
			{...extraFormProps}>
			{csrf || null}
			<div
				// TODO o-normalise-visually-hidden
				className="myft-follow-button__announcement o-normalise-visually-hidden"
				aria-live="assertive"></div>
			<button
				aria-pressed={followed}
				aria-label={buttonLabel}
				title={buttonLabel}
				type="submit"
				className="myft-concept-button__button"
				{...extraButtonProps}>
				{label || conceptName}
			</button>
		</form>
	);
}

export {FollowButton};
