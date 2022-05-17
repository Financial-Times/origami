export interface IconProps {
	// currently no way to get a const type from a JSON import in TypeScript so
	// let's stick with a string type for now
	icon: string;
}

export function Icon({icon}: IconProps): JSX.Element {
	return <span className={`o-icons-icon o-icons-icon--${icon}`}></span>;
}
