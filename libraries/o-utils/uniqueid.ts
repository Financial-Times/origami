export const uidBuilder = (componentName: string) => prefix => {
	const uid = String(Math.random()).split('.')[1];
	return `${componentName}-${prefix}${uid}`;
};
