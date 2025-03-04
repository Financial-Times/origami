const Dummy = () => (
	<>
		Storybook{' '}
		<a href="https://github.com/chromaui/chromatic-cli/issues/774">
			composition requires a Story
		</a>
		, though we do not need any. Origami v2 (o2) has a seperate Storyboook for
		each brand. This Storybook composes them all into one place.
	</>
);
export default {
	title: 'Placeholder',
	component: Dummy,
	tags: ['!autodocs', '!dev'], // Hide story in the sidebar
};

export const Story = {};
