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
	const MeterElement = () => {
		return (
			<meter
				className="o-meter"
				aria-label={label}
				data-o-component="o-meter"
				min={min}
				max={max}
				low={low}
				high={high}
				optimum={optimum}
				value={value}
			>
				{value}
			</meter>
		);
	};

	if (valueBox) {
		const boxValueIndentation = (value / max) * 100 + "%";
		return (
			<div className="o-meter-container">
				<MeterElement />
				<span
					className="o-meter-value"
					aria-hidden="true"
					style={{ left: boxValueIndentation }}
				>
					{value}
				</span>
			</div>
		);
	}

	return <MeterElement />;
}
