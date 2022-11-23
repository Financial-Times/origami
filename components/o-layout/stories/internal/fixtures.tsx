export function DemoHeader() {
	return (
		<header className="o-header-services" data-o-component="o-header-services">
			<div className="o-header-services__top">
				<div className="o-header-services__logo"></div>

				<div className="o-header-services__title">
					<span className="o-header-services__product-name">
						<a href="/">Layout Demos</a>
					</span>
					<span className="o-header-services__product-tagline">
						Documentation Layout
					</span>
				</div>
			</div>
		</header>
	);
}

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
				href="#">
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
				href="#">
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
				href="#">
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
				href="#">
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

export function DemoFooter() {
	return (
		<footer className="o-footer-services">
			<div className="o-footer-services__container">
				<div className="o-footer-services__wrapper o-footer-services__wrapper--top">
					<a
						className="o-footer-services__icon-link o-footer-services__icon-link--github"
						href="http://github.com/financial-times/o-footer-services">
						View project on GitHub
					</a>
					<a
						className="o-footer-services__icon-link o-footer-services__icon-link--slack"
						href="https://slack.com/messages/[id]/">
						#slack-channel
					</a>
					<p className="o-footer-services__content">
						Help or advice can be found here
						<a href="mailto:an.email@someplace.com">an.email@someplace.com</a>
						and there are other places,
						<a href="/somewhere">like this one</a>.
					</p>
				</div>
			</div>
			<div className="o-footer-services__container">
				<div className="o-footer-services__wrapper o-footer-services__wrapper--legal">
					<div className="o-footer-services__links">
						<a href="http://help.ft.com/help/legal-privacy/cookies/">Cookies</a>
						<a href="http://help.ft.com/help/legal-privacy/copyright/copyright-policy/">
							Copyright
						</a>
						<a
							href="http://help.ft.com/help/legal-privacy/privacy/"
							className="o-footer-services__bulletted-link">
							Privacy
						</a>
						<a href="http://help.ft.com/help/legal-privacy/terms-conditions">
							Terms &amp; Conditions
						</a>
					</div>
					<p>
						<span>&#xA9; THE FINANCIAL TIMES LTD 2020.</span> FT and
						&apos;Financial Times&apos; are trademarks of The Financial Times
						Ltd.
					</p>
				</div>
			</div>
		</footer>
	);
}

export function DemoHero() {
	return (
		<>
			<h1>An Example Landing Page</h1>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
			<div>
				<a
					key={1}
					className="o-layout__unstyled-element demo-button o-buttons o-buttons--big o-buttons--mono o-buttons--primary"
					href="#">
					Do A Thing
				</a>
				<a
					key={2}
					className="o-layout__unstyled-element demo-button o-buttons o-buttons--big o-buttons--mono o-buttons--secondary"
					href="#">
					Learn More
				</a>
			</div>
		</>
	);
}
