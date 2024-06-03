import {BigNumber} from '@financial-times/o3-editorial-typography/esm';

function BigNumberPreview() {
	return (
		//<preview>
		<BigNumber title="£27.5">
			Cost expected to increase by £13.7m a year.
		</BigNumber>
		//</preview>
	);
}

export const filePath =
	'src/components/editorial-typography/preview/BigNumber.tsx';
export {BigNumberPreview as preview};
