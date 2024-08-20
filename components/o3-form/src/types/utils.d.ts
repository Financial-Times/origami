declare module '@financial-times/o-utils' {
	/**
	 * Generates a unique ID string by concatenating the given component name, prefix, and a random number.
	 *
	 * @param componentName - The name of the component to be included in the ID string.
	 * @returns A function that takes a prefix string and returns a unique ID string.
	 *
	 * @example
	 *
	 * const generateId = uidBuilder('myComponent');
	 * const id = generateId('prefix');
	 * console.log(id); // 'myComponent-prefix1234567890'
	 */
	export function uidBuilder(componentName: string): (prefix: string) => string;
}
