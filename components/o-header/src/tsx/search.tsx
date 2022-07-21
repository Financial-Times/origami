export function Search({instance}: {instance: string}) {
	return (
		<div
			id={`o-header-search-${instance}`}
			className={`o-header__row o-header__search o-header__search--${instance}`}
			data-o-header-search>
			<div className="o-header__container">
				<form
					className="o-header__search-form"
					action="/search"
					role="search"
					aria-label="Site search">
					<label
						className="o-header__visually-hidden"
						htmlFor={`o-header-search-term-${instance}`}>
						Search the <abbr title="Financial Times">FT</abbr>
					</label>
					<input
						className="o-header__search-term"
						id={`o-header-search-term-${instance}`}
						name="q"
						type="text"
						autoComplete="off"
						autoCorrect="off"
						autoCapitalize="off"
						spellCheck={false}
						placeholder="Search the FT"
					/>
					<button className="o-header__search-submit" type="submit">
						Search
					</button>
					<button
						className="o-header__search-close o--if-js"
						type="button"
						aria-controls={`o-header-search-${instance}`}
						title="Close search bar">
						<span className="o-header__visually-hidden">Close search bar</span>
					</button>
				</form>
			</div>
		</div>
	);
}

export function EnhancedSearch() {
	return (
		<div
			id="o-header-search-js"
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
				id={`o-header-search-term-${props.instance}`}
				name="q"
				type="text"
				placeholder="Search the FT"
			/>
			<button className="o-header__search-submit" type="submit">
				Search
			</button>
			{props.children}
		</form>
	);
}
