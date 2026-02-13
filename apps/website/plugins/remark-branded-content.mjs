import {visit} from 'unist-util-visit';

export default function remarkBrandedContent() {
	/**
	 * Transform.
	 *
	 * @param {Root} tree
	 *   Tree.
	 * @param {VFile} file
	 *   File
	 * @returns {undefined}
	 *   Nothing.
	 */
	return (tree, file) => {
		// Add an import statement for the BrandedContent component,
		// to all processed files.
		const esmImport = {
			type: 'mdxjsEsm',
			data: {
				estree: {
					type: 'Program',
					body: [
						{
							type: 'ImportDeclaration',
							specifiers: [
								{
									type: 'ImportDefaultSpecifier',
									local: {
										type: 'Identifier',
										name: 'BrandedContent',
									},
								},
							],
							source: {
								type: 'Literal',
								value: `${file.cwd}/src/components/BrandedContent.astro`,
							},
						},
					],
					sourceType: 'module',
				},
			},
		};
		tree.children.unshift(esmImport);

		// Automatically add the `currentBrand` prop to all `BrandedContent`
		// component uses.
		visit(tree, 'mdxJsxFlowElement', node => {
			if (node.name === 'BrandedContent') {
				node.attributes.push({
					type: 'mdxJsxAttribute',
					name: 'currentBrand',
					value: {
						type: 'mdxJsxAttributeValueExpression',
						value: 'props.brand',
						data: {
							estree: {
								body: [
									{
										type: 'ExpressionStatement',
										expression: {
											type: 'MemberExpression',
											object: {
												type: 'Identifier',
												name: 'props',
											},
											property: {
												type: 'Identifier',
												name: 'brand',
											},
										},
									},
								],
							},
						},
					},
				});
			}
		});
	};
}
