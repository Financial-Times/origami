export function DemoMainContent() {
	return (
		<div data-o-component="o-syntax-highlight">
			<h1 id="an-example-documentation-layout">Documentation Layout</h1>
			<h2 id="sidebar-navigation">Sidebar Navigation</h2>
			<p>
				<code className="o-syntax-highlight--html">o-layout</code> can generate
				a sidebar navigation, find out more in the{" "}
				<a href="https://registry.origami.ft.com/components/o-layout/readme">
					readme
				</a>
				.
			</p>
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur sunt
				rerum quod repudiandae repellat fugit laboriosam eveniet harum in natus!
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
				velit? Fugiat, sed doloribus. Neque blanditiis aliquam, ab perspiciatis
				mollitia nesciunt fugit vitae soluta ducimus eos, aspernatur praesentium
				iure, aliquid modi.
			</p>
			<h2 id="asides">Asides</h2>
			<p>
				Asides are also styled and positioned witin the documentation layout.
			</p>
			<h3 id="sub-section-1">Sub Section 1</h3>
			<aside>
				<h3>Hello, I am an aside.</h3>
				<p>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam,
					numquam.
				</p>
			</aside>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel amet minus
				quibusdam officia, consequuntur perspiciatis laudantium illum, expedita
				nostrum corrupti accusantium eligendi doloremque quisquam eos commodi
				temporibus tempora obcaecati. Inventore omnis blanditiis quia mollitia
				aperiam quibusdam dignissimos unde molestias ipsam.
			</p>
			<figure>
				<img
					alt="An example figure with caption."
					src="https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fim.ft-static.com%2Fcontent%2Fimages%2Fa60ae24b-b87f-439c-bf1b-6e54946b4cf2.img?source=origami"
				/>
				<figcaption className="o-typography-caption">
					An example figure with caption.
				</figcaption>
			</figure>
			<h3 id="sub-section-2">Sub Section 2</h3>
			<ul>
				<li>List item 1</li>
				<li>List item 2</li>
				<li>List item 3</li>
				<li>List item 4</li>
			</ul>
			<ol>
				<li>Ordered list item 1</li>
				<li>Ordered list item 2</li>
				<li>Ordered list item 3</li>
				<li>Ordered list item 4</li>
			</ol>
			<h2 id="tables">Tables</h2>
			<p>
				The <code>table</code> element spans both columns automatically, but we
				recommend you use a responsive
				<a href="https://registry.origami.ft.com/components/o-table">o-table</a>
				and apply the <code>o-layout__main__full-span</code> class.
			</p>
			<p>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam rem
				libero inventore ab nisi pariatur!
			</p>
			<blockquote>
				<p>
					Blockquote... lorem ipsum dolor sit amet, consectetur adipisicing
					elit. Omnis ea suscipit iusto perspiciatis harum, qui maxime
					necessitatibus facilis, quo natus rem accusamus autem! Magnam
					pariatur, perferendis molestiae et tenetur repudiandae.
				</p>
				<footer>by Origami Team</footer>
			</blockquote>
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam
				doloribus eum maiores dolor ipsam expedita aut rerum animi soluta
				veritatis eaque quia quisquam, ratione tenetur facere iste cum quos?
				Repudiandae?
			</p>

			<div className="o-layout__main__full-span">
				<div className="o-table-container">
					<div className="o-table-overlay-wrapper">
						<div className="o-table-scroll-wrapper">
							<table
								className="o-table o-table--horizontal-lines o-table--responsive-overflow"
								data-o-component="o-table"
								data-o-table-responsive="overflow"
							>
								<thead>
									<tr>
										<th scope="col" role="columnheader">
											Fruit
										</th>
										<th scope="col" role="columnheader">
											Genus
										</th>
										<th scope="col" role="columnheader">
											Characteristic
										</th>
										<th
											scope="col"
											role="columnheader"
											data-o-table-data-type="numeric"
											className="o-table__cell--numeric"
										>
											Cost&#xA0;(GBP)
										</th>
										<th
											scope="col"
											role="columnheader"
											data-o-table-data-type="numeric"
											className="o-table__cell--numeric"
										>
											Cost&#xA0;(EUR)
										</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Dragonfruit</td>
										<td>Stenocereus</td>
										<td>Juicy</td>
										<td className="o-table__cell--numeric">3</td>
										<td className="o-table__cell--numeric">2.72</td>
									</tr>
									<tr>
										<td>Durian</td>
										<td>Durio</td>
										<td>Smelly</td>
										<td className="o-table__cell--numeric">1.75</td>
										<td className="o-table__cell--numeric">1.33</td>
									</tr>
									<tr>
										<td>Naseberry</td>
										<td>Manilkara</td>
										<td>Chewy</td>
										<td className="o-table__cell--numeric">2</td>
										<td className="o-table__cell--numeric">1.85</td>
									</tr>
									<tr>
										<td>Strawberry</td>
										<td>Fragaria</td>
										<td>Sweet</td>
										<td className="o-table__cell--numeric">1.5</td>
										<td className="o-table__cell--numeric">1.69</td>
									</tr>
									<tr>
										<td>Apple</td>
										<td>Malus</td>
										<td>Crunchy</td>
										<td className="o-table__cell--numeric">0.5</td>
										<td className="o-table__cell--numeric">0.56</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export function DemoFooter() {
	return (
		<footer className="o-footer-services">
			<div className="o-footer-services__container">
				<div className="o-footer-services__wrapper o-footer-services__wrapper--top">
					<a
						className="o-footer-services__icon-link o-footer-services__icon-link--github"
						href="http://github.com/financial-times/o-footer-services"
					>
						View project on GitHub
					</a>
					<a
						className="o-footer-services__icon-link o-footer-services__icon-link--slack"
						href="https://slack.com/messages/[id]/"
					>
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
							className="o-footer-services__bulletted-link"
						>
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
