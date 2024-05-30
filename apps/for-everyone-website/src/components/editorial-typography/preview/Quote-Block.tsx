import {Quote} from '@financial-times/o3-editorial-typography/esm';

function BlockQuote() {
	return (
		//<preview>
		<Quote type="block" quoteAuthor="Jon Doe" quoteSource='Quote Source'>
			This paragraph is for snippet of contents from an author’s speech to be
			quote. The following elements in the quote components are optional to
			provide flexibility appropriate for your use case: caption that tells more
			information about the author and the vertical bar on the side.
		</Quote>
		//</preview>
	);
}

export {BlockQuote as preview};
