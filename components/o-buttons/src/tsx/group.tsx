import {Button} from './button'

export interface ButtonGroupProps {
    children: JSX.Element[];
}

export function ButtonGroup({
    children = []
}: ButtonGroupProps) {
    return (
        <div className="o-buttons-group">
            {children}
        </div>
        );
    }
