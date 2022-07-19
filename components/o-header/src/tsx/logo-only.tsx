import { TopCenter } from "./top";

export function LogoOnlyHeader() {
	return (
		<header className="o-header" data-o-component="o-header" data-o-header--no-js>
			<div className="o-header__row o-header__top">
				<div className="o-header__container">
					<div className="o-header__top-wrapper">
						<TopCenter />
					</div>
				</div>
			</div>
		</header>
	);
}
