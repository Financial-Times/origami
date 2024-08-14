// return (<!-- To support both core and enhanced, duplicating the search row is necessary to avoid it flashing in enhanced -->
// 	<!-- Pick only one of the two <div> if you don't need to support both core and enhanced -->

export function Search() {
	const searchDivId = 'o-header-search';

	return (
		<div
			id={searchDivId}
			className="o-header__row o-header__search"
			role="search"
			data-o-header-search>
			<div className="o-header__container">
				<SearchForm>
					<button
						className="o-header__search-close o--if-js"
						type="button"
						aria-controls={searchDivId}
						title="Close search bar">
						<span className="o-header__visually-hidden">Close search bar</span>
						<span>Close</span>
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
	const searchFieldId = 'o-header-search-term';

	return (
		<form
			className="o-header__search-form"
			action="/search"
			role="search"
			aria-label="Site search">
			<label
				htmlFor={searchFieldId}
				className="o-header__search-term o-forms-field o-forms-field--optional">
				<span className="o-forms-title o-header__visually-hidden">
					<span className="o-forms-title__main">
						Search the <abbr title="Financial Times">FT</abbr>
					</span>
				</span>
				<span className="o-forms-input o-forms-input--text o-forms-input--suffix">
					<input
						id={searchFieldId}
						name="q"
						type="search"
						autoComplete="off"
						autoCorrect="off"
						autoCapitalize="off"
						spellCheck={false}
						placeholder="Search for stories, topics or securities"
					/>
					<button className="o-header__search-submit" type="submit">
						<span aria-hidden="true" className="o-header__search-icon"></span>
						<span>Search</span>
					</button>
					{props.children}
				</span>
			</label>
		</form>
	);
}
