import React, {useEffect, useMemo, useState} from 'react';
import {getContrastRatio, getWCAGRating} from './utils';

export type Color = {
	name: string;
	css: string;
};

type ColorCardProps = {
	color: Color;
};

export type GroupedColorsType = Record<string, Color[]>;

type ColorPaletteProps = {
	colors: Color[] | GroupedColorsType;
};

type ContrastRatioCheckerProps = {
	colors: {
		palettes: GroupedColorsType;
		tones: GroupedColorsType;
	};
};

type ColorControllerProps = ContrastRatioCheckerProps & {
	setBackground: React.Dispatch<React.SetStateAction<Color>>;
	setForeground: React.Dispatch<React.SetStateAction<Color>>;
};

type TabType = 'background' | 'foreground';

type ColorOptionsProps = {
	base: string;
	colors: Color[];
	defaultSelected: string;
	handleSelect: (color: Color) => void;
};

type ContrastInfoProps = {
	foreground: Color;
	background: Color;
};

function areColorsGrouped(obj: any): obj is GroupedColorsType {
	if (typeof obj !== 'object' || obj === null) return false;

	for (const key in obj) {
		if (!Array.isArray(obj[key])) return false;
		for (const color of obj[key]) {
			if (typeof color !== 'object' || color === null) return false;
			if (typeof color.css !== 'string') return false;
			if (typeof color.name !== 'string') return false;
		}
	}
	return true;
}

// A single color card component
export const ColorBox = ({color}: ColorCardProps) => {
	const [copied, setCopied] = useState(false);

	const copyToClipboard = () => {
		navigator.clipboard
			.writeText(`${color.css}`)
			.then(() => {
				setCopied(true);
				setTimeout(() => setCopied(false), 2000); // reset after 2 seconds
			})
			.catch(err => console.error('Error copying text: ', err));
	};

	const whiteTextColorRatio = getContrastRatio('#ffffff', color.css);
	const textColor = whiteTextColorRatio >= 4.5 ? '#ffffff' : '#000000';

	return (
		<div
			className="color-box-container"
			style={{
				border: `2px solid ${
					color.name.match(/white/i) || color.css.match(/#ffffff/i)
						? '#ccc1b7'
						: color.css
				}`,
			}}
		>
			<div
				className="color-info-container"
				style={{
					borderBottom: `2px solid ${
						color.name.match(/white/i) || color.css.match(/#ffffff/i)
							? '#ccc1b7'
							: color.css
					}`,
				}}
			>
				<h4 className="color-name">{color.name}</h4>
			</div>
			<div
				className="color-box"
				style={{
					backgroundColor: `${color.css}`,
					color: textColor,
				}}
			>
				<p className="color-box-css-value">{color.css}</p>

				<button
					className="color-box-copy-btn"
					onClick={copyToClipboard}
					style={{
						color: textColor,
					}}
				>
					{copied ? 'Copied!' : 'Click to copy'}
				</button>
			</div>
		</div>
	);
};

export const ColorPalette = ({colors}: ColorPaletteProps) => {
	if (areColorsGrouped(colors)) {
		const renderedGroupedColors = Object.entries(colors).map(
			([base, groupedColors]) => (
				<div className="color-palette color-palette--column">
					<div
						className="color-palette-group-base-container"
						style={{
							border: `2px solid ${
								base.match(/white/i) || base.match(/#ffffff/i)
									? ` var(--o3-color-use-case-page-inverse-background)`
									: `var(--o3-color-palette-${base}, var(--o3-color-use-case-page-inverse-background))`
							}`,
						}}
					>
						<h3 className="color-palette-group-base">{base}</h3>
					</div>

					<div className="color-boxes">
						{groupedColors.map(color => (
							<ColorBox key={color.css} color={color} />
						))}
					</div>
				</div>
			)
		);
		return renderedGroupedColors;
	}

	return (
		<div className="color-palette">
			{colors.map(color => (
				<ColorBox key={color.css} color={color} />
			))}
		</div>
	);
};

const ColorOptions = ({
	base,
	colors,
	defaultSelected,
	handleSelect,
}: ColorOptionsProps) => {
	const handleButtonClick = (color: Color) => {
		const buttonEl: HTMLElement | null = document.getElementById(color.css);
		const currentClickedButtonEl: HTMLElement | null =
			document.querySelector(`.color-btn--clicked`);
		if (buttonEl && currentClickedButtonEl) {
			currentClickedButtonEl.classList.remove(`color-btn--clicked`);
			buttonEl.classList.add(`color-btn--clicked`);
		}
		handleSelect(color);
	};
	return (
		<div className="color-palette">
			<h4>{base}</h4>
			<div className="colors">
				{colors.map(color => {
					return (
						<button
							id={color.css}
							className={`color-btn ${
								defaultSelected === color.css ? 'color-btn--clicked' : ''
							}`}
							aria-label={`Select ${color.name} color`}
							onClick={() => handleButtonClick(color)}
							style={{
								backgroundColor: color.css,
							}}
						></button>
					);
				})}
			</div>
		</div>
	);
};

const ColorSelector = ({
	colors,
	setBackground,
	setForeground,
}: ColorControllerProps) => {
	const [activeTab, setActiveTab] = useState<TabType>('background');
	const [selectedButton, setSelectedButton] = useState({
		background: '#fff1e5',
		foreground: '#000000',
	});

	const handleSelect = (color: Color) => {
		if (activeTab === 'background') {
			setBackground(color);
			setSelectedButton({...selectedButton, background: color.css});
		}
		if (activeTab === 'foreground') {
			setForeground(color);
			setSelectedButton({...selectedButton, foreground: color.css});
		}
	};

	const handleTabClick = (tab: TabType) => {
		setActiveTab(tab);
		const tabEl: HTMLElement | null = document.querySelector(`.${tab}-tab`);
		const currentActiveTabEl: HTMLElement | null =
			document.querySelector(`.active-tab`);
		if (tabEl && currentActiveTabEl) {
			currentActiveTabEl.classList.remove(`active-tab`);
			tabEl.classList.add(`active-tab`);
		}
	};

	useEffect(() => {}, [activeTab]);

	const colorPalettes = Object.entries(colors.palettes);
	const colorTones = Object.entries(colors.tones);

	return (
		<div className="color-selector-container">
			<div className="color-selector-tabs">
				<button
					className="background-tab active-tab"
					onClick={() => handleTabClick('background')}
				>
					Background Color
				</button>
				<button
					className="foreground-tab"
					onClick={() => handleTabClick('foreground')}
				>
					Foreground Color
				</button>
			</div>
			<div className="colors-container">
				{colorPalettes.length > 0 && (
					<div className="color-palettes">
						<h3>Palettes</h3>
						{colorPalettes.map(([base, groupedColors]) => (
							<ColorOptions
								defaultSelected={selectedButton[`${activeTab}`]}
								base={base}
								colors={groupedColors}
								handleSelect={handleSelect}
							/>
						))}
					</div>
				)}
				{colorTones.length > 0 && (
					<div className="color-palettes">
						<h3>Tones</h3>
						{colorTones.map(([base, groupedColors]) => (
							<ColorOptions
								defaultSelected={selectedButton[`${activeTab}`]}
								base={base}
								colors={groupedColors}
								handleSelect={handleSelect}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

const ContrastInfo = ({foreground, background}: ContrastInfoProps) => {
	const ratio = useMemo(
		() => getContrastRatio(foreground.css, background.css),
		[foreground.css, background.css]
	);

	const info = useMemo(() => getWCAGRating(ratio), [ratio]);

	useEffect(() => {
		const wcagEl: HTMLElement | null = document.querySelector('.wcag-rating');
		const ratingMessageEl: HTMLElement | null =
			document.querySelector('.rating-message');
		if (wcagEl) {
			wcagEl.className = `wcag-rating rating-result--${info.status}`;
		}
		if (ratingMessageEl) {
			ratingMessageEl.className = `rating-message rating-result--${info.status}`;
		}
	}, [info.status]);

	return (
		<div className="contrast-info">
			<div className="contrast-combination">
				<span className="title">Combination </span>
				<span className="combination">
					<code>{foreground.name}</code> on <code>{background.name}</code>
				</span>
			</div>
			<div className="contrast-details">
				<h4 className="title">Contrast Details</h4>
				<span className="contrast-ratio">
					<span>
						Contrast ratio: <strong>{ratio}</strong>
					</span>
					<span className={`wcag-rating rating-result--${info.status}`}>
						{info.wcagRating}
					</span>
				</span>
				<p className={`rating-message rating-result--${info.status}`}>
					{info.message}
				</p>
			</div>
		</div>
	);
};

export const ContrastRatioChecker = ({colors}: ContrastRatioCheckerProps) => {
	const [background, setBackground] = useState({name: 'paper', css: '#fff1e5'});
	const [foreground, setForeground] = useState({name: 'black', css: '#000000'});
	useEffect(() => {
		const colorBox: HTMLElement | null = document.querySelector('.color-box');
		if (colorBox) {
			colorBox.style.backgroundColor = background.css;
			colorBox.style.color = foreground.css;
		}
	}, [background, foreground]);

	return (
		<div className="contrast-ratio-checker-container">
			<div className="color-box">
				<div className="color-controller">
					<div>
						<ContrastInfo foreground={foreground} background={background} />
						<div className="contrast-showcase">
							<h3>This is an example of text at 18px</h3>
							<p>Everything else is 14px</p>
							<p>
								This contrast checker is constrained to the colours that exist
								within the{' '}
								<a href="https://origami-beta.ft.com/guides/colours/">
									o3-foundation color palettes
								</a>
								.
							</p>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
								nec ultrices arcu. Donec faucibus euismod condimentum. Donec
								pharetra diam nunc, accumsan tempus est pellentesque nec.
								Vivamus eget fermentum lacus. Integer quis luctus leo, sed
								placerat mi.
							</p>
						</div>
					</div>
					<ColorSelector
						colors={colors}
						setBackground={setBackground}
						setForeground={setForeground}
					/>
				</div>
			</div>
		</div>
	);
};
