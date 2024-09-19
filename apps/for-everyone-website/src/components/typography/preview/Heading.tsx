import {Heading} from '@financial-times/o3-foundation/esm';

function HeadingPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<>
				<Heading level="1">Heading level 1</Heading>
				<Heading level="2">Heading level 2</Heading>
				<Heading level="3">Heading level 3</Heading>
				<Heading level="4">Heading level 4</Heading>
				<Heading level="5">Heading level 5</Heading>
			</>
			<meta itemProp="@preview" />
		</>
	);
}

export const filePath = 'src/components/typography/preview/Heading.tsx';

export {HeadingPreview as preview};
