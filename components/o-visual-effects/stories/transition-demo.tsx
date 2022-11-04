import { CSSProperties, useState } from "react";

export interface TransitionProps {
	transition: "fade" | "expand" | "slide";
	timing: Number;
}

export function TransitionDemo({ transition, timing }: TransitionProps) {
	const [active, updateActiveStatus] = useState(false);
	const classes = ["demo-transition", `demo-transition--${transition}`];
	let label = "";
	switch (transition) {
		case "slide":
			label = `a circle that ${
				active ? "has slid" : "can slide"
			} from left to right`;
			break;
		case "expand":
			label = `a square that ${active ? "has expanded" : "can expand"}`;
			break;
		case "fade":
			label = `a square that ${
				active ? "can fade in and out" : "has faded out"
			}`;
			break;
		default:
			const _exhaustiveCheck: never = transition;
			label = `a shape with a "${transition}" transition applied`;
			console.warn(
				`Could not create a descriptive label for o-visual-effects transition "${_exhaustiveCheck}".`
			);
			break;
	}
	if (active) {
		classes.push("demo-transition--active");
	}

	// Use CSS Properties to demo their use in the HTML tab
	const customProperties = {
		"--demo-transition-timing-function": `var(--o-visual-effects-timing-${transition})`,
		"--demo-transition-duration": `${timing}s`,
	} as CSSProperties;

	return (
		<>
			<button
				aria-controls="demo-element"
				aria-pressed={active}
				className="demo-button"
				onClick={() => {
					updateActiveStatus(!active);
				}}
			>
				{transition}
			</button>
			<div
				id="demo-element"
				className={classes.join(" ")}
				style={customProperties}
			>
				<span className="demo-transition__label" aria-live="polite">
					{label}
				</span>
			</div>
		</>
	);
}
