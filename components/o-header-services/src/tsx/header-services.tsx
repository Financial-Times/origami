type HeaderServicesProps = {
	title: string;
	tagline?: string;
	titleUrl?: string;
	relatedContent?: JSX.Element[] | JSX.Element;
	primaryNav?: boolean;
	secondaryNav?: boolean;
	dropdown?: boolean;
	modifier?: string;
};

export function HeaderServices({
	title,
	tagline,
	titleUrl,
	relatedContent,
	modifier,
}: HeaderServicesProps) {
	const classNames = ['o-header-services'];
	modifier && classNames.push(`o-header-services--${modifier}`);
	return (
		<header
			className={classNames.join(' ')}
			data-o-component="o-header-services">
			<Title
				title={title}
				tagline={tagline}
				titleUrl={titleUrl}
				relatedContent={relatedContent}
			/>
		</header>
	);
}

function Title({title, tagline, titleUrl, relatedContent}) {
	const homeUrl = titleUrl || '/';
	return (
		<div className="o-header-services__top">
			{/* Link to a fallback nav for the core experience when using a drawer and hamburger icon. */}
			<div className="o-header-services__hamburger">
				<a
					className="o-header-services__hamburger-icon"
					href="#core-nav-fallback"
					role="button">
					<span className="o-header-services__visually-hidden">
						Open primary navigation
					</span>
				</a>
			</div>
			<div className="o-header-services__logo"></div>
			<div className="o-header-services__title">
				<a className="o-header-services__product-name" href={homeUrl}>
					{title}
				</a>
				{tagline && (
					<span className="o-header-services__product-tagline">{tagline}</span>
				)}
			</div>
			{relatedContent && (
				<ul className="o-header-services__related-content">
					{relatedContent.map((element, i) => (
						<li key={i}>{element}</li>
					))}
				</ul>
			)}
		</div>
	);
}
