import {NavMenuItem} from './Props';

export function SubNavigation({
	breadcrumb,
	subsections,
	rightSubsection,
}: {
	breadcrumb: NavMenuItem[];
	subsections: NavMenuItem[];
	rightSubsection?: NavMenuItem[];
}) {
	return (
		<div
			className="o-header__subnav"
			role="navigation"
			aria-label="Sub navigation"
			data-o-header-subnav>
			<div className="o-header__container">
				<div className="o-header__subnav-wrap-outside">
					<div
						className="o-header__subnav-wrap-inside"
						data-o-header-subnav-wrapper>
						<div className="o-header__subnav-content">
							<BreadCrumb breadcrumb={breadcrumb} />
							<SubSections subsections={subsections} />
							{rightSubsection && (
								<SubSections
									subsections={rightSubsection}
									rightAlignment={true}
								/>
							)}
						</div>
					</div>
					<button
						className="o-header__subnav-button o-header__subnav-button--left"
						title="scroll left"
						aria-label="scroll left"
						aria-hidden="true"
						disabled></button>
					<button
						className="o-header__subnav-button o-header__subnav-button--right"
						title="scroll right"
						aria-label="scroll right"
						aria-hidden="true"
						disabled></button>
				</div>
			</div>
		</div>
	);
}

function BreadCrumb({breadcrumb}: {breadcrumb: NavMenuItem[]}) {
	return (
		<ol
			className="o-header__subnav-list o-header__subnav-list--breadcrumb"
			aria-label="Breadcrumb">
			{breadcrumb &&
				breadcrumb.map(({label, url, selected}, i) => {
					const selectedClass = selected
						? 'o-header__subnav-link--highlight'
						: '';
					const ariaLabel = selected ? label + ', current page' : undefined;
					const ariaCurrent = selected ? 'page' : undefined;
					return (
						<li className="o-header__subnav-item" key={`breadcrumb-${i}`}>
							<a
								className={`o-header__subnav-link ${selectedClass}`}
								aria-label={ariaLabel}
								aria-current={ariaCurrent}
								href={url}>
								{label}
							</a>
						</li>
					);
				})}
		</ol>
	);
}

function SubSections({
	subsections,
	rightAlignment,
}: {
	subsections: NavMenuItem[];
	rightAlignment?: boolean;
}) {
	if (!subsections || subsections.length === 0) {
		return null;
	}

	const wrapperClass = rightAlignment ? ' o-header__subnav-list--right' : '';
	return (
		<ul
			className={`o-header__subnav-list o-header__subnav-list--children${wrapperClass}`}
			aria-label={rightAlignment ? 'Additional Sub Navigation' : 'Subsections'}>
			{subsections &&
				subsections.map(({label, url, selected, index}, i) => {
					const selectedClass = selected
						? 'o-header__subnav-link--highlight'
						: '';
					const ariaLabel = selected ? label + ', current page' : undefined;
					const ariaCurrent = selected ? 'page' : undefined;
					return (
						<li className="o-header__subnav-item" key={`subsection-${i}`}>
							<a
								className={`o-header__subnav-link ${selectedClass}`}
								aria-label={ariaLabel}
								aria-current={ariaCurrent}
								href={url}>
								{label}
							</a>
						</li>
					);
				})}
		</ul>
	);
}
