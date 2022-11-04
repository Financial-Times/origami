export interface QuoteProps {
	type: "standard" | "editorial";
	copy: string;
	author?: string;
	source?: string;
}

export function Quote({
	type = "standard",
	copy = "Lorem ipsum.",
	author = "author",
	source = "source",
}: QuoteProps) {
	const classNames = ["o-quote", `o-quote--${type}`];

	return (
		<blockquote className={classNames.join(" ")}>
			<p>{copy}</p>
			{author || source ? (
				<cite className="o-quote__cite">
					{author ? <span className="o-quote__author">{author}</span> : ""}
					{source ? <span className="o-quote__source">source</span> : ""}
				</cite>
			) : (
				""
			)}
		</blockquote>
	);
}
