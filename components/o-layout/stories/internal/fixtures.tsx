import { ArticleListProps } from "../../src/tsx/layout";

export const overviewActionElements = [
	{
		element: (
			<>
				<h3>Here&apos;s A Thing</h3>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
					quaerat odit perferendis distinctio laboriosam id porro minus eveniet
					ea reiciendis minima odio eos, molestias consectetur dolor nostrum
					architecto ducimus deserunt.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
					earum, repudiandae quia consequatur nostrum sit eligendi odio cum
					aliquid fuga.
				</p>
			</>
		),
		actionElement: (
			<a
				className="o-layout__unstyled-element o-buttons o-buttons--big o-buttons--primary"
				href="#"
			>
				Take An Action
			</a>
		),
	},
	{
		element: (
			<>
				<h3>And Another</h3>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
					numquam!
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis,
					dolor. Autem recusandae vero ut labore? Provident doloremque assumenda
					iste aperiam quis debitis natus iure aspernatur. Tenetur, suscipit.
					Officiis, molestias porro?
				</p>
			</>
		),
		actionElement: (
			<a
				className="o-layout__unstyled-element o-buttons o-buttons--big o-buttons--primary"
				href="#"
			>
				Do A Thing
			</a>
		),
	},
	{
		element: (
			<>
				<h3>And More Choices</h3>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
					voluptatibus?
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab corrupti
					nemo voluptate aperiam explicabo vitae cupiditate atque fugiat
					dignissimos, aut in blanditiis perferendis soluta natus ducimus
					incidunt corporis autem quia?
				</p>
			</>
		),
		actionElement: (
			<a
				className="o-layout__unstyled-element o-buttons o-buttons--big o-buttons--primary"
				href="#"
			>
				Do A Different Thing
			</a>
		),
	},
	{
		element: (
			<>
				<h3>What To Do</h3>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
					voluptatibus?
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab corrupti
					nemo voluptate aperiam explicabo vitae cupiditate atque fugiat
					dignissimos, aut in blanditiis perferendis soluta natus ducimus
					incidunt corporis autem quia?
				</p>
			</>
		),
		actionElement: (
			<a
				className="o-layout__unstyled-element o-buttons o-buttons--big o-buttons--primary"
				href="#"
			>
				Learn More
			</a>
		),
	},
];
export const overviewElements = [
	{
		element: (
			<>
				<h3>Great For This</h3>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
					quaerat odit perferendis distinctio laboriosam id porro minus eveniet
					ea reiciendis minima odio eos, molestias consectetur dolor nostrum
					architecto ducimus deserunt.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
					earum, repudiandae quia consequatur nostrum sit eligendi odio cum
					aliquid fuga.
				</p>
			</>
		),
	},
	{
		element: (
			<>
				<h3>Good For That</h3>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
					numquam!
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis,
					dolor. Autem recusandae vero ut labore? Provident doloremque assumenda
					iste aperiam quis debitis natus iure aspernatur. Tenetur, suscipit.
					Officiis, molestias porro?
				</p>
			</>
		),
	},
	{
		element: (
			<>
				<h3>And More</h3>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
					voluptatibus?
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab corrupti
					nemo voluptate aperiam explicabo vitae cupiditate atque fugiat
					dignissimos, aut in blanditiis perferendis soluta natus ducimus
					incidunt corporis autem quia?
				</p>
			</>
		),
	},
];
export const articleList: ArticleListProps[] = [
	{
		title: "Some Example Article",
		url: "#",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores ipsum suscipit dolorum inventore ipsam perferendis omnis animi quo corrupti ad.",
		meta: (
			<>
				Posted <time dateTime="2020-10-28T00:00:00Z">20 November 2020</time> by
				Author Name. Tagged: <span>Newsletter</span>.
			</>
		),
	},
	{
		title: "Another Example Article",
		url: "#",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima culpa optio consequuntur dolorem, ab incidunt saepe quibusdam quae velit explicabo.",
		meta: (
			<>
				Posted <time dateTime="2020-10-28T00:00:00Z">04 December 2019</time> by
				Some Other Author Name. Tagged: <span>Technology</span>.
			</>
		),
	},
	{
		title: "Yet Another Example Article",
		url: "#",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima culpa optio consequuntur dolorem, ab incidunt saepe quibusdam quae velit explicabo.",
		meta: (
			<>
				Posted <time dateTime="2020-10-28T00:00:00Z">20 June 2019</time> by Name
				Namerson. Tagged: <span>Design</span>.
			</>
		),
	},
];

export const DemoHero = (
	<>
		<h1>An Example Landing Page</h1>
		<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
		<div>
			<a
				key={1}
				className="o-layout__unstyled-element demo-button o-buttons o-buttons--big o-buttons--mono o-buttons--primary"
				href="#"
			>
				Do A Thing
			</a>
			<a
				key={2}
				className="o-layout__unstyled-element demo-button o-buttons o-buttons--big o-buttons--mono o-buttons--secondary"
				href="#"
			>
				Learn More
			</a>
		</div>
	</>
);

export const QueryLayout = {
	queryHeading: (
		<>
			<h1 id="searchable-things">Searchable Things</h1>
			<p>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur
				ipsa illum veniam doloremque ut laborum voluptates saepe dignissimos
				cupiditate eos.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, sapiente.
			</p>
		</>
	),
	querySideBar: (
		<form
			action="/components"
			method="get"
			className="registry__form registry__container__sticky"
			data-o-component="o-filter-form"
			data-o-filter-form-browser-history="true"
		>
			<div
				className="o-forms-field"
				role="group"
				aria-labelledby="filter-type-title"
				aria-describedby="filter-type-info"
			>
				<span className="o-forms-title">
					<span className="o-forms-title__main" id="filter-type-title">
						Types
					</span>
					<span className="o-forms-title__prompt" id="filter-type-info">
						Filter results by type
					</span>
				</span>
				<span className="o-forms-input o-forms-input--checkbox">
					<label>
						<input
							type="checkbox"
							name="module"
							value="true"
							aria-label="Modules"
							defaultChecked
						/>
						<span className="o-forms-input__label" aria-hidden="true">
							Modules
						</span>
					</label>

					<label>
						<input
							type="checkbox"
							name="imageset"
							value="true"
							aria-label="Imagesets"
							defaultChecked
						/>
						<span className="o-forms-input__label" aria-hidden="true">
							Imagesets
						</span>
					</label>

					<label>
						<input
							type="checkbox"
							name="service"
							value="true"
							aria-label="Services"
							defaultChecked
						/>
						<span className="o-forms-input__label" aria-hidden="true">
							Services
						</span>
					</label>
				</span>
			</div>

			<div
				className="o-forms-field"
				role="group"
				aria-labelledby="filter-status-title"
				aria-describedby="filter-status-info"
			>
				<span className="o-forms-title">
					<span className="o-forms-title__main" id="filter-status-title">
						Status
					</span>
					<span className="o-forms-title__prompt" id="filter-status-info">
						Filter results by status
					</span>
				</span>
				<span className="o-forms-input o-forms-input--checkbox">
					<label>
						<input
							type="checkbox"
							name="active"
							value="true"
							aria-label="Active"
							defaultChecked
						/>
						<span className="o-forms-input__label" aria-hidden="true">
							Active
						</span>
					</label>

					<label>
						<input
							type="checkbox"
							name="maintained"
							value="true"
							aria-label="Maintained"
							defaultChecked
						/>
						<span className="o-forms-input__label" aria-hidden="true">
							Maintained
						</span>
					</label>

					<label>
						<input
							type="checkbox"
							name="experimental"
							value="true"
							aria-label="Experimental"
							defaultChecked
						/>
						<span className="o-forms-input__label" aria-hidden="true">
							Experimental
						</span>
					</label>

					<label>
						<input
							type="checkbox"
							name="deprecated"
							value="true"
							aria-label="Deprecated"
							defaultChecked
						/>
						<span className="o-forms-input__label" aria-hidden="true">
							Deprecated
						</span>
					</label>

					<label>
						<input
							type="checkbox"
							name="dead"
							value="true"
							aria-label="Dead"
							defaultChecked
						/>
						<span className="o-forms-input__label" aria-hidden="true">
							Dead
						</span>
					</label>
				</span>
			</div>
		</form>
	),
	mainContent: (
		<div data-o-component="o-syntax-highlight">
			<h2 id="results">Results</h2>
			<ul>
				<li>
					<p>Result 1</p>
				</li>
				<li>
					<p>Result 2</p>
				</li>
				<li>
					<p>Result 3</p>
				</li>
				<li>
					<p>Result 4</p>
				</li>
				<li>
					<p>Result 5</p>
				</li>
				<li>
					<p>Result 6</p>
				</li>
				<li>
					<p>Result 7</p>
				</li>
				<li>
					<p>Result 8</p>
				</li>
				<li>
					<p>Result 9</p>
				</li>
				<li>
					<p>Result 10</p>
				</li>
				<li>
					<p>Result 11</p>
				</li>
				<li>
					<p>Result 12</p>
				</li>
			</ul>
		</div>
	),
	asideSideBar: (
		<div className="o-layout-sticky-sidebar-container">
			<p>
				Aside Sidebar: Lorem ipsum, dolor sit amet consectetur adipisicing{" "}
				<code className="o-syntax-highlight--html">o-layout</code> elit.
				Pariatur beatae, tempora deleniti inventore impedit minus corrupti omnis
				esse assumenda perspiciatis?
			</p>
		</div>
	),
};
