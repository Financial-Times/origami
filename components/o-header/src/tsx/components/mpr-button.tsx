import React from 'react';

export interface MprButtonProps {
	id: string
	dataTrackable: string
}

const MPR_URL = 'https://professional-monetary-policy-radar.ft.com/'

export const MprButton = ({ id, dataTrackable }: MprButtonProps) => (
	<a
		id={id}
		className={`o-header__mpr-button`}
		data-trackable={dataTrackable}
		href={MPR_URL}
		title="MPR"
		target="_blank"
		role="button"
	>
		MPR
	</a>
)
