const docs = `
<div class="o-layout o-layout--docs" data-o-component="o-layout">
	<header class="o-layout__header"></header>

	<div class="o-layout__sidebar"></div>

	<div class="o-layout__main">
		<h1 id="this-is-a-h1">This is a heading level 1</h2>
		<h2 id="this-is-a-h2">This is a heading level 2</h2>
		<p>This is some content.</p>
		<p>This is more content</p>
		<p>This is even more content</p>
	</div>

	<footer class="o-layout__footer"></footer>
</div>
`;

const docsWithSubHeading = `
<div class="o-layout o-layout--docs" data-o-component="o-layout">
	<header class="o-layout__header"></header>

	<div class="o-layout__sidebar"></div>

	<div class="o-layout__main">
		<h1 id="this-is-a-h1">This is a heading level 1</h2>
		<h2 id="this-is-a-h2">This is a heading level 2</h2>
		<h3 id="sub-heading-1">Sub heading 1</h3>
		<h5 id="sub-heading-1b">Sub heading 1b</h5>
		<h3 id="sub-heading-2">Sub heading 2</h3>
		<p>This is some content.</p>
		<p>This is more content</p>
		<h2 id="this-is-a-second-h2">This is a second heading level 2</h2>
		<h3 id="sub-heading-a">Sub heading a</h3>
		<p>This is even more content</p>
	</div>

	<footer class="o-layout__footer"></footer>
</div>
`;

const query = `
<div class="o-layout o-layout--query" data-o-component="o-layout">
    <div class="o-layout__header"></div>
    <div class="o-layout__heading o-layout-typography">
    	<h1 id="this-is-a-h1">Heading</h1>
    </div>
    <div class="o-layout__query-sidebar o-layout-typography"></div>
	<div class="o-layout__main o-layout-typography">
		<h2 id="this-is-a-h2">This is a heading level 2</h2>
		<p>This is some content.</p>
		<p>This is more content</p>
		<p>This is even more content</p>
	</div>
    <div class="o-layout__aside-sidebar o-layout-typography"></div>
    <div class="o-layout__footer"></div>
</div>
`;

export { docs, query, docsWithSubHeading};
