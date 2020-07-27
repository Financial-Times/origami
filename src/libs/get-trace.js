// Trace the element and all of its parents, collecting properties as we go

import utils from '../javascript/utils';

// For a given container element, get the number of elements that match the
// original element (siblings); and the index of the original element (position).
const getSiblingsAndPosition = (el, originalEl, selector) => {
	const siblings = Array.from(el.querySelectorAll(selector));
	const position = siblings.findIndex(item => item === originalEl);
	if(position === -1) {return;}
	return {
		siblings: siblings.length,
		position,
	};
};


const elementPropertiesToCollect = [
	"nodeName",
	"className",
	"id",
	"href",
	"text",
	"role",
];
// Get all (sanitised) properties of a given element.
const getAllElementProperties = element => {

	const properties = {};
	for (const property of elementPropertiesToCollect) {
		const value = element[property] || element.getAttribute(property) || element.hasAttribute(property);
		if (value !== undefined) {
			if (typeof value === 'boolean') {
				properties[property] = value;
			} else {
				properties[property] = utils.sanitise(value);
			}
		}
	}

	return properties;
};

// Get some properties of a given element.
const getDomPathProps = (attrs, props) => {

	// Collect any attribute that matches given strings.
	attrs
		.filter(attribute => attribute.name.match(/^data-trackable|^data-o-|^aria-/i))
		.forEach(attribute => {
			props[attribute.name] = attribute.value;
		});

	return props;
};

// Get only the custom data-trackable-context-? properties of a given element
const getContextProps = (attrs, props, isOriginalEl) => {

	const customProps = {};

	// for the original element collect properties like className, nodeName
	if (isOriginalEl) {
		elementPropertiesToCollect.forEach(name => {
			if (typeof props[name] !== 'undefined' && name !== 'id') {
				customProps[name] = props[name];
			}
		});
	}

	// Collect any attribute that matches given strings.
	attrs
		.filter(attribute => attribute.name.match(/^data-trackable-context-/i))
		.forEach(attribute => {
			customProps[attribute.name.replace('data-trackable-context-', '')] = attribute.value;
		});

	return customProps;
};

function getTrace (el) {
	const rootEl = document;
	const originalEl = el;
	const selector = originalEl.getAttribute('data-trackable') ? `[data-trackable="${originalEl.getAttribute('data-trackable')}"]` : originalEl.nodeName;
	const trace = [];
	const customContext = {};
	while (el && el !== rootEl) {
		const props = getAllElementProperties(el);
		const attrs = Array.from(el.attributes);
		let domPathProps = getDomPathProps(attrs, props);

		// If the element happens to have a data-trackable attribute, get the siblings
		// and position of the element (relative to the current element).
		if (domPathProps["data-trackable"]) {
			domPathProps = Object.assign(
				domPathProps,
				getSiblingsAndPosition(el, originalEl, selector)
			);
		}

		trace.push(domPathProps);

		const contextProps = getContextProps(attrs, props, el === originalEl);

		utils.assignIfUndefined(contextProps, customContext);

		el = el.parentNode;
	}
	return { trace, customContext };
}

export default getTrace;
