import {TopicTag} from '@financial-times/o3-editorial-typography/esm';

function TopicTagPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<TopicTag href="#">Topic link</TopicTag>
			<meta itemProp="@preview" />
		</>
	);
}

export const filePath =
	'src/components/editorial-typography/preview/TopicTag.tsx';

export {TopicTagPreview as preview};
