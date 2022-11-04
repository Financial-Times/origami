interface BigNumberProps {
	title: string;
	content: string;
}

export function BigNumber({ title, content }: BigNumberProps) {
	return (
		<div className="o-big-number">
			<div className="o-big-number__title">{title}</div>
			<div className="o-big-number__content">{content}</div>
		</div>
	);
}
