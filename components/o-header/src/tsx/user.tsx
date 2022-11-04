import { TNavMenuItem } from "./Props";

export function UserActionsNav({
	userNavItems,
}: {
	userNavItems: TNavMenuItem[];
}) {
	return (
		<div className="o-header__row o-header__anon">
			<ul className="o-header__anon-list">
				{userNavItems.map((item, index) => (
					<li className="o-header__anon-item" key={`link-${index}`}>
						<a className="o-header__anon-link" href={item.url || undefined}>
							{item.label}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
