export type MeterProps = {
	meterValue: number;
	label: string;
	min?: number;
	max?: number;
	low?: number;
	high?: number;
	optimum?: number;
	valueBox?: boolean;
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
	label,
	min,
	max,
	low,
	high = 100,
	optimum,
	valueBox,
}: MeterProps) {
	let boxValueIndentation;

	if (valueBox) {
		boxValueIndentation = (meterValue / max) * 100 + '%';
	}
	return (
		<MeterContainerWrapper
			condition={valueBox}
			details={{meterValue, boxValueIndentation}}>
			<meter
				className="o-meter"
				aria-label={label}
				data-o-component="o-meter"
				min={min}
				max={max}
				low={low}
				high={high}
				optimum={optimum}
				value={meterValue}>
				{meterValue}
			</meter>
		</MeterContainerWrapper>
	);
}
