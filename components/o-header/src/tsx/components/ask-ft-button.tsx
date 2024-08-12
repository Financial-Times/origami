export interface AskFtButtonProps {
	id: string
	variant: 'top'
	dataTrackable: string
}

export const AskFtButton = ({ id, variant, dataTrackable }: AskFtButtonProps) => (
	<a
		id={id}
		className={`o-header__ask-ft-button o-header__ask-ft-button--${variant}`}
		data-trackable={dataTrackable}
		href="https://ask.ft.com"
		title="ASK FT"
	>
		Ask FT
	</a>
)
