import { CSSProperties } from "react";

export interface ShadowProps {
	depth: "ultralow" | "low" | "mid" | "high";
}

export function ShadowDemo({ depth }: ShadowProps) {
	// Use CSS Properties to demo their use in the HTML tab
	const customProperties = {
		"box-shadow": `var(--o-visual-effects-shadow-${depth})`,
	} as CSSProperties;

	return (
		<div style={customProperties} className="shadow-demo">
			{depth} shadow
		</div>
	);
}
