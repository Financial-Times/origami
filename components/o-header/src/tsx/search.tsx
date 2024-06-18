// return (<!-- To support both core and enhanced, duplicating the search row is necessary to avoid it flashing in enhanced -->
// 	<!-- Pick only one of the two <div> if you don't need to support both core and enhanced -->

export function Search() {
	return (
		<div
			id="o-header-search"
			className="o-header__row o-header__search"
			role="search"
			data-o-header-search>
			<div className="o-header__container">
				<SearchForm>
					<button
						className="o-header__search-close o--if-js"
						type="button"
						aria-controls="o-header-search-js"
						title="Close search bar">
						<span className="o-header__visually-hidden">Close search bar</span>
					</button>
				</SearchForm>
			</div>
		</div>
	);
}

export function CoreSearch() {
	return (
		<div
			id="o-header-search"
			className="o-header__row o-header__search o--if-no-js"
			role="search">
			<div className="o-header__container">
				<SearchForm />
			</div>
		</div>
	);
}

function SearchForm(props) {
	return (
		<form
			className="o-header__search-form"
			action="/search"
			role="search"
			aria-label="Site search">
			<label
				className="o-header__visually-hidden"
				htmlFor="o-header-search-term-js">
				Search the <abbr title="Financial Times">FT</abbr>
			</label>
			<input
				className="o-header__search-term"
				id={`o-header-search-term`}
				name="q"
				type="text"
				autoComplete="off"
				autoCorrect="off"
				autoCapitalize="off"
				spellCheck={false}
				placeholder="Search for stories, topics or securities"
			/>
			<button className="o-header__search-submit" type="submit">
				Search
			</button>
			{props.children}
		</form>
	);
}
