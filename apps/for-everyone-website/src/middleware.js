export function onRequest(context, next) {
	const pathNodes = context.url.pathname.split('/').filter(str => str !== '');
	const blogIndex = pathNodes.indexOf('blog');

	if (blogIndex > 0) {
		const pathNoLocale =
			'/' + pathNodes.slice(blogIndex, pathNodes.length).join('/');

		return Response.redirect(context.url.origin + pathNoLocale);
	}
	return next();
}
