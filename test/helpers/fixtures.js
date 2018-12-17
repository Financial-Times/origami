
const testMarkup = {

	steppedProgress: `
		<div class="o-stepped-progress" data-o-component="o-stepped-progress">
			<ol class="o-stepped-progress__steps">
				<li>
					<a href="#step-1" class="o-stepped-progress__step o-stepped-progress__step--complete">
						<span class="o-stepped-progress__label">
							Step 1 <span class="o-stepped-progress__status">(completed)</span>
						</span>
					</a>
				</li>
				<li>
					<a href="#step-2" class="o-stepped-progress__step o-stepped-progress__step--current">
						<span class="o-stepped-progress__label">
							Step 2 <span class="o-stepped-progress__status">(current step)</span>
						</span>
					</a>
				</li>
				<li>
					<span class="o-stepped-progress__step">
						<span class="o-stepped-progress__label">Step 3</span>
					</span>
				</li>
				<li>
					<span class="o-stepped-progress__step">
						<span class="o-stepped-progress__label">Step 4</span>
					</span>
				</li>
			</ol>
		</div>
	`,

	steppedProgressStep: `
		<a href="#" class="o-stepped-progress__step">
			<span class="o-stepped-progress__label">
				Mock Step
				<span class="o-stepped-progress__status">mock status</span>
			</span>
		</a>
	`
};

export {
	testMarkup
};
