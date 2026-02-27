import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {useEffect} from 'react';
import {initSubnavDropdowns} from '../src/js/subnavDropdown';
import subnavDropdownsData from './storybook-data/subnavDropdowns';
import './subnav.scss';
import './header.scss';

interface DropdownItem {
	label: string;
	url: string;
}

interface SubnavItem {
	label: string;
	url: string;
	selected?: boolean;
	dropdown?: DropdownItem[];
}

/**
* Renders a modal to display a set of dropdown options for a specific subnavigation item.
*/
const SubNavDropdown: React.FC<{items: DropdownItem[]; title?: string}> = ({
	items,
	title,
}) => {
	return (
		<div
			className="o-header__subnav-dropdown"
			data-o-header-subnav-dropdown
			aria-hidden="true"
			aria-expanded="false"
			role="dialog"
			aria-modal="true"
			aria-label={title || 'Navigation menu'}>
			{title && <h2 className="o-header__subnav-dropdown-title">{title}</h2>}
			<button
				className="o-header__subnav-dropdown-close"
				data-o-header-subnav-dropdown-close
				aria-label="Close menu"
				type="button">
				<span className="o-header__subnav-dropdown-close-icon" />
			</button>
			<ul className="o-header__subnav-dropdown-list">
				{items.map((item, index) => (
					<li key={index} className="o-header__subnav-dropdown-item">
						<a href={item.url} className="o-header__subnav-dropdown-link">
							{item.label}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

/**
* Story component to render subnavigation items with and without dropdown options.
* This is defined explicity for this story due to the html for the subnav dropdown options living outside of origami.
*/
function SubnavWithDropdownsDemo({items}: {items: SubnavItem[]}) {
	return (
		<>
			<div
				className="o-header__subnav"
				role="navigation"
				aria-label="Sub navigation"
				data-o-header-subnav>
				<div className="o-header__container">
					<div className="o-header__subnav-wrap-outside">
						<div
							className="o-header__subnav-wrap-inside"
							data-o-header-subnav-wrapper>
							<div className="o-header__subnav-content">
								<ul
									className="o-header__subnav-list o-header__subnav-list--children"
									aria-label="Subsections">
									{items.map((item, i) => {
										const selectedClass = item.selected
											? 'o-header__subnav-link--highlight'
											: '';
										const ariaLabel = item.selected
											? `${item.label}, current page`
											: undefined;
										const ariaCurrent = item.selected ? 'page' : undefined;

										return (
											<li className="o-header__subnav-item" key={i}>
												{item.dropdown ? (
													<span
														className={`o-header__subnav-link ${selectedClass}`}
														aria-label={ariaLabel}
														aria-current={ariaCurrent}
														data-trackable={item.label}
														style={{cursor: 'pointer'}}>
														{item.label}
														<SubNavDropdown
															items={item.dropdown}
															title={item.label}
														/>
													</span>
												) : (
													<a
														className={`o-header__subnav-link ${selectedClass}`}
														aria-label={ariaLabel}
														aria-current={ariaCurrent}
														href={item.url}
														data-trackable={item.label}>
														{item.label}
													</a>
												)}
											</li>
										);
									})}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="demo-dropdown-description">
				<h3>Subnavigation dropdowns</h3>
				<p>
					Specific subnavigation items can be given a set of dropdown options.
				</p>
				<p>
					<strong>On Desktop:</strong> toggle dropdowns by hovering the items.
					Positioning is dynamic.
				</p>
				<p>
					<strong>On Mobile:</strong> toggle dropdowns by tapping the item.
					Positioning is static.
				</p>
				<p>
					Dropdown options should be in a direct child element to the item and
					should have the <code>data-o-header-subnav-dropdown</code> property.
				</p>
			</div>
		</>
	);
}

export default {
	title: 'Maintained/o-header',
	component: SubnavWithDropdownsDemo,
	parameters: {
		layout: 'fullscreen',
	},
} as ComponentMeta<typeof SubnavWithDropdownsDemo>;

export const SubnavDropdowns: ComponentStory<
	typeof SubnavWithDropdownsDemo
> = () => {
	useEffect(() => {
		const subnavEl = document.querySelector('[data-o-header-subnav]');
		if (subnavEl) {
			initSubnavDropdowns(subnavEl);
		}
	}, []);

	return <SubnavWithDropdownsDemo items={subnavDropdownsData} />;
};
SubnavDropdowns.storyName = 'Subnav with dropdowns';
SubnavDropdowns.parameters = {
	controls: {
		exclude: [
			'data',
			'variant',
			'userIsAnonymous',
			'extraHeaderProps',
			'currentPath',
			'userIsLoggedIn',
			'showAskButton',
			'showMprButton',
			'showSubNavigation',
			'showUserNavigation',
			'showMegaNav',
			'userIsSubscribed',
			'showStickyHeader',
			'showLogoLink',
		],
	},
};
