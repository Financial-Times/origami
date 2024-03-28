import * as react_jsx_runtime from 'react/jsx-runtime';

interface ButtonProps {
    label: string;
    type: 'primary' | 'secondary' | 'ghost';
    size?: 'small' | '';
    theme?: 'inverse' | 'mono';
    icon?: 'arrow-left' | 'arrow-right' | 'upload' | 'tick' | 'plus' | 'arrow-down' | 'arrow-up' | 'edit-outlined' | 'download' | 'search' | 'refresh' | 'cross';
    iconOnly?: boolean;
    visuallyHideDisabled?: boolean;
    attributes?: {
        [attribute: string]: string | boolean;
    };
    onClick?: Function;
}
interface LinkButtonProps extends ButtonProps {
    href: string;
}
type ButtonPaginationProps = Pick<ButtonProps, 'theme'> & {
    previousPager: ButtonPaginationPager;
    pages: ButtonPaginationItem[];
    nextPager: ButtonPaginationPager;
};
interface ButtonPaginationItem {
    href?: string;
    current: boolean;
    number: number;
    onClick?: any;
}
interface ButtonPaginationPager {
    label: string;
    href?: string;
    onClick?: any;
}
interface ButtonGroupProps {
    children: JSX.Element[];
}

declare function Button({ label, type, size, theme, icon, iconOnly, visuallyHideDisabled, attributes, onClick, }: ButtonProps): react_jsx_runtime.JSX.Element;
declare function LinkButton({ label, type, size, theme, icon, iconOnly, visuallyHideDisabled, attributes, href, onClick, }: LinkButtonProps): react_jsx_runtime.JSX.Element;

declare function ButtonPagination({ theme, previousPager, pages, nextPager, }: ButtonPaginationProps): react_jsx_runtime.JSX.Element;

declare function ButtonGroup({ children }: ButtonGroupProps): react_jsx_runtime.JSX.Element;

export { Button, ButtonGroup, ButtonPagination, LinkButton };
