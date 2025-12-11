export const Form = ({id, children}: {
	id?: string,
	children: React.JSX.Element | React.JSX.Element[];
}) => {
	return <form id={id} className="o3-form" >{children}</form>;
};
