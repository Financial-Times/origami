import React from 'react';

import {
	addons,
	types,
	useStorybookState,
	useGlobals,
} from '@storybook/manager-api';
import {IconButton, WithTooltip, TooltipLinkList} from '@storybook/components';
import {OutlineIcon} from '@storybook/icons';

addons.register('o3-brand-selector', () => {
	addons.add('o3-brand-selector/toolbar', {
		title: 'Brand Selector',
		//👇 Sets the type of UI element in Storybook
		type: types.TOOL,
		//👇 Shows the Toolbar UI element if the story canvas is being viewed
		match: ({tabId, viewMode}) => !tabId && viewMode === 'story',
		render: ({active}) => {
			const [{selectedBrand}, updateGlobals] = useGlobals();

			const state = useStorybookState();
			const story = state?.storiesHash?.[state.storyId];

			if (!story || !story.parameters || !story.parameters.o3BrandSelector) {
				return null;
			}

			const supportedBrands = story.parameters.o3BrandSelector?.brands || [];
			const tags = story.tags || [];
			const brands = tags.filter(tag => supportedBrands.includes(tag));

			return (
				<>
					<WithTooltip
						placement="bottom"
						trigger="click"
						tooltip={({onHide}) => (
							<TooltipLinkList
								links={brands.map(b => ({
									id: b,
									title: b,
									active: b === selectedBrand,
									onClick: () => {
										updateGlobals({selectedBrand: b});
										onHide();
									},
								}))}
							/>
						)}>
						<IconButton active={active} title="Show a Storybook toolbar">
							<OutlineIcon />
							Brand: {selectedBrand}
						</IconButton>
					</WithTooltip>
				</>
			);
		},
	});
});
