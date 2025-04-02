export type SpacingDemoProps = {
	name:
		| '5xs'
		| '4xs'
		| '3xs'
		| '2xs'
		| 'xs'
		| 's'
		| 'm'
		| 'l'
		| 'xl'
		| '2xl'
		| '3xl'
		| '4xl';
};

export function SpacingDemo({name}: SpacingDemoProps) {
	const dimensionCSS = {
		height: `var(--o3-spacing-${name})`,
		width: `var(--o3-spacing-${name})`,
	};
	return (
		<>
			<div className="demo" style={dimensionCSS}>
				<span className="o3-visually-hidden">space: {name}</span>
			</div>
		</>
	);
}
