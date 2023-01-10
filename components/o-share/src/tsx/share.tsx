type ShareProps = {
	small?: boolean;
	vertical?: boolean;
	inverse?: boolean;
	children?: JSX.Element | JSX.Element[];
};

export function Share({
	small,
	vertical,
	inverse,
	children,
}: ShareProps) {
	let className = "";
	if (small) className = " o-share--small";
	if (vertical) className = " o-share--vertical";
	if (inverse) className += " o-share--inverse";
	return (
		<div data-o-component="o-share" className={`o-share${className}`}>
			<ul>
				{children}
			</ul>
		</div>
	);
}
