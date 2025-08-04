import React from 'react';

import {
	addons,
	types,
	useStorybookState,
	useGlobals,
	useArgs,
	useParameter,
} from '@storybook/manager-api';
import {IconButton, WithTooltip, TooltipLinkList} from '@storybook/components';
import {PaintBrushIcon} from '@storybook/icons';

addons.register('o3-brand-selector', () => {
	addons.add('o3-brand-selector/toolbar', {
		title: 'Brand Selector',
		//👇 Sets the type of UI element in Storybook
		type: types.TOOL,
		//👇 Shows the Toolbar UI element if the story canvas is being viewed
		match: ({tabId, viewMode}) => !tabId && viewMode === 'story',
		render: ({active}) => {
			const [{selectedBrand}, updateGlobals] = useGlobals();
			const [args, updateArgs] = useArgs();
			const state = useStorybookState();
			const brandSelectorConfig = useParameter('o3BrandSelector', {
				brands: [],
			});
			const supportedBrands = brandSelectorConfig.brands.map(
				brand => brand.name
			);

			const story = state?.storiesHash?.[state.storyId];

			if (!story || !story.parameters || !supportedBrands.length === 0) {
				return null;
			}

			const selectedTheme = args.theme || 'standard';
			const themeOptions = story.argTypes?.theme?.options || [];

			const tags = story.tags || [];
			const brands = tags.filter(tag => supportedBrands.includes(tag));

			return (
				<>
					<WithTooltip
						placement="bottom"
						trigger="click"
						tooltip={({onHide}) => (
							<TooltipLinkList
								links={brands.map(brand => ({
									id: brand,
									title: brand,
									active: brand === selectedBrand,
									onClick: () => {
										const backgroundForTheme = getBackgroundForTheme(
											brandSelectorConfig,
											brand,
											selectedTheme
										);

										updateGlobals({
											selectedBrand: brand,
											backgrounds: {
												value:
													story.parameters.backgrounds.values.find(
														background => background.name === backgroundForTheme
													).value || null,
											},
										});

										onHide();
									},
								}))}
							/>
						)}>
						<IconButton active={active} title="Show a Storybook toolbar">
							<PaintBrushIcon />
							Brand: {selectedBrand}
						</IconButton>
					</WithTooltip>
					<WithTooltip
						placement="bottom"
						trigger="click"
						tooltip={({onHide}) => (
							<TooltipLinkList
								links={themeOptions.map(t => ({
									id: t,
									title: t,
									active: t === selectedBrand,
									onClick: () => {
										const backgroundForTheme = getBackgroundForTheme(
											brandSelectorConfig,
											selectedBrand,
											t
										);

										updateArgs({
											theme: t,
										});

										updateGlobals({
											backgrounds: {
												value:
													story.parameters.backgrounds.values.find(
														bg => bg.name === backgroundForTheme
													).value || null,
											},
										});

										onHide();
									},
								}))}
							/>
						)}>
						<IconButton active={active} title="Show a Storybook toolbar">
							<PaintBrushIcon />
							Theme: {selectedTheme}
						</IconButton>
					</WithTooltip>
				</>
			);
		},
	});
});

const getBackgroundForTheme = (brandSelectorConfig, b, theme) => {
	const selectedBrand = brandSelectorConfig.brands.find(
		brand => brand.name === b
	);

	return selectedBrand.background[theme];
};
