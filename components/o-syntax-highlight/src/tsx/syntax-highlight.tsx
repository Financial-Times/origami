type SyntaxHighlightProps = {
	language:
		| 'html'
		| 'js'
		| 'css'
		| ''
		| 'json'
		| 'yaml'
		| 'scss'
		| 'diff'
		| 'bash';
	code: string;
};

export function SyntaxHighlight(props) {
	return <div data-o-component="o-syntax-highlight">{props.children}</div>;
}

export function SyntaxHighlightBlock({language, code}: SyntaxHighlightProps) {
	return (
		<pre tabIndex={0}>
			<code className={`o-syntax-highlight${language && '--' + language}`}>
				{code}
			</code>
		</pre>
	);
}
