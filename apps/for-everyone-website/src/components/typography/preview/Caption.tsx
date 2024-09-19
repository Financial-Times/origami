import {Caption} from '@financial-times/o3-foundation/esm';
import {BigNumber} from '@financial-times/o3-editorial-typography/esm';

function CaptionPreview() {
	return (
		<div style={{width: '200px'}}>
			<BigNumber title="£13.7m">
				<meta itemProp="@preview" />
				<Caption>
					Cost of the rights expected to increase by one-third or about £13.7m a
					year although some anticipate inflation of up to 70%
				</Caption>
				<meta itemProp="@preview" />
			</BigNumber>
		</div>
	);
}

export const filePath = 'src/components/typography/preview/Caption.tsx';

export {CaptionPreview as preview};
