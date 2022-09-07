type ExampleProps = {
	theme?: string
}

export function Example({theme}: {theme: ExampleProps}) {
	return (
		<div id="element" className={`o-example o-example--${theme}`} data-o-component="o-example">
			Hello world, I am a component named o-example!
			<span className="o-example__counter">
				You have clicked this lovely button <span data-o-example-current-count>0</span> times.
				<button className="o-example__button">count</button>
			</span>
		</div>
	)
}
