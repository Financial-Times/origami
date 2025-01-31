const toolingFormat = ({dictionary}) => {
	return (
		'export default ' +
		'{\n' +
		dictionary.allTokens
			.map(function (token) {
				const type =
					token.type === 'dimension' && token.name.includes('lineheight')
						? 'lineHeights'
						: token.type;
				const value = {
					shortName: token.path[token.path.length - 1],
					value: token.value,
					originalValue: token.original.value,
					type,
					description: token.description,
					attributes: {
						item: token.attributes.item,
						subitem: token.attributes.subitem,
						state: token.attributes.state,
					},
					origamiKeys: token.origamiKeys,
					path: token.path,
					origamiTint: token.origamiTint,
					css: `--${token.name}`,
					figma: token.path.join('/'),
				};
				return `\t"${token.name}": ${JSON.stringify(value, null, '\t\t')}`;
			})
			.join(',\n') +
		'\n}' +
		';\n'
	);
};

export {toolingFormat};
