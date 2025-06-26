interface EditorialLayoutBodyArgs {
	children: string | React.JSX.Element | React.JSX.Element[];
}
export const EditorialLayoutBody = ({children}: EditorialLayoutBodyArgs) => {
	return <p className='o-editorial-layout-body'>{children}</p>
}
