interface EditorialLayoutBodyArgs {
	children: string | JSX.Element | JSX.Element[];
}
export const EditorialLayoutBody = ({children}: EditorialLayoutBodyArgs) => {
	return <p className='o-editorial-layout-body'>{children}</p>
}
