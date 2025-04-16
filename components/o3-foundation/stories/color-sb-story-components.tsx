import {useState} from 'react';
import {getContrastRatio} from './utils';

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
			className="color-box-container o3-type-body-base"
			style={{
				border: `2px solid ${
					color.name.match(/white/i) || color.css.match(/#ffffff/i)
						? '#ccc1b7'
						: color.css
				}`,
			}}>
			<div
				className="color-info-container"
				style={{
					borderBottom: `2px solid ${
						color.name.match(/white/i) || color.css.match(/#ffffff/i)
							? '#ccc1b7'
							: color.css
					}`,
				}}>
				<h4 className="color-name">{color.name}</h4>
			</div>
			<div
				className="color-box"
				style={{
					backgroundColor: `${color.css}`,
					color: textColor,
				}}>
				<p className="color-box-css-value">{color.css}</p>

				<button
					className="color-box-copy-btn"
					onClick={copyToClipboard}
					style={{
						color: textColor,
					}}>
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
						}}>
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
