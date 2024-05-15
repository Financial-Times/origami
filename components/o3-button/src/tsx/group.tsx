import type {ButtonGroupProps} from '../types/index';

export function ButtonGroup({children = []}: ButtonGroupProps) {
	return <div className="o3-button-group">{children}</div>;
}
