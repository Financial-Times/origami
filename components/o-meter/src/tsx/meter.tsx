export type MeterProps = {
	value: number;
	label: string;
	min?: number;
	max?: number;
	low?: number;
	high?: number;
	optimum?: number;
	valueBox?: boolean;
};

type WrapperProps = {
	condition: boolean | undefined;
	children: JSX.Element;
};

const MeterContainerWrapper = ({condition, children}: WrapperProps) => {
	const wrapper = children => (
		<div className="o-meter-container">{children}</div>
	);
	return condition ? wrapper(children) : children;
};

export function Meter({
	value,
	label,
	min,
	max = 100,
	low,
	high,
	optimum,
	valueBox = false,
}: MeterProps) {
	let boxValueIndentation;

	if (valueBox) {
		boxValueIndentation = (value / max) * 100 + '%';
	}
	return (
		<MeterContainerWrapper condition={valueBox}>
			<>
			<meter
				className="o-meter"
				aria-label={label}
				data-o-component="o-meter"
				min={min}
				max={max}
				low={low}
				high={high}
				optimum={optimum}
				value={value}>
				{value}
			</meter>
			{valueBox && (
				<span
				className="o-meter-value"
				aria-hidden="true"
				style={{left: boxValueIndentation}}>
					{value}
				</span>
			)}
			</>
		</MeterContainerWrapper>
	);
}
