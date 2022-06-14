import {CSSProperties} from 'react';

interface CustomColorsTypes extends CSSProperties {
	'--o-meter-background-color'?: string;
	'--o-meter-optimum-color'?: string;
	'--o-meter-sub-optimum-color'?: string;
	'--o-meter-less-than-sub-optimum-color'?: string;
}

interface CustomDimensionsTypes extends CSSProperties {
	'--o-meter-width'?: string;
	'--o-meter-height'?: string;
}

export type MeterProps = {
	meterValue: number;
	ariaLabel: string;
	min?: number;
	max?: number;
	low?: number;
	high?: number;
	optimum?: number;
	valueBox?: boolean;
	customColors?: CustomColorsTypes;
	customDimensions?: CustomDimensionsTypes;
};

const MeterContainerWrapper = ({condition, details, children}) => {
	const wrapper = children => (
		<div className="o-meter-container" style={details.customDimensions}>
			{children}
			<span
				className="o-meter-value"
				aria-hidden="true"
				style={{left: details.boxValueIndentation}}>
				{details.meterValue}
			</span>
		</div>
	);
	return condition ? wrapper(children) : children;
};

export function Meter({
	meterValue,
	ariaLabel,
	min,
	max,
	low,
	high = 100,
	optimum,
	valueBox,
	customColors,
	customDimensions,
}: MeterProps) {
	let boxValueIndentation;
	let customStyles = {...customColors};

	if (valueBox) {
		boxValueIndentation = (meterValue / high) * 100 + '%';
	} else {
		customStyles = {...customStyles, ...customDimensions};
	}
	return (
		<MeterContainerWrapper
			condition={valueBox}
			details={{meterValue, boxValueIndentation, customDimensions}}>
			<meter
				className="o-meter"
				aria-label={ariaLabel}
				data-o-component="o-meter"
				min={min}
				max={max}
				low={low}
				high={high}
				optimum={optimum}
				style={customStyles}
				value={meterValue}>
				{meterValue}
			</meter>
		</MeterContainerWrapper>
	);
}
