import {Quote} from '@financial-times/o3-editorial-typography/esm';

function PullQuote() {
	return (
		<>
			<meta itemProp="@preview" />
			<Quote type="pull" quoteAuthor="Jon Doe">
				This paragraph is for snippet of contents from an author’s speech to be
				quote. The following elements in the quote components are optional to
				provide flexibility appropriate for your use case: caption that tells
				more information about the author and the vertical bar on the side.
			</Quote>
			<meta itemProp="@preview" />
		</>
	);
}

export const filePath =
	'src/components/editorial-typography/preview/Quote-Pull.tsx';

export {PullQuote as preview};
