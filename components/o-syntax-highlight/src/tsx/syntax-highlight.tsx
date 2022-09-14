type SyntaxHighlightProps = {
	language: string;
	template: string;
};

export function SyntaxHighlight({language, template}: SyntaxHighlightProps) {
	return (
		<pre tabIndex={0}>
			<code className={`o-syntax-highlight${language && '--' + language}`}>
				{template}
			</code>
		</pre>
	);
}
