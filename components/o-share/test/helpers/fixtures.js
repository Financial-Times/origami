let sandboxEl;

function createSandbox() {
	if (document.querySelector(".sandbox")) {
		sandboxEl = document.querySelector(".sandbox");
	} else {
		sandboxEl = document.createElement("div");
		sandboxEl.setAttribute("class", "sandbox");
		document.body.appendChild(sandboxEl);
	}
}

function reset() {
	sandboxEl.innerHTML = "";
}

function insert(html) {
	createSandbox();
	sandboxEl.innerHTML = html;
}

function insertShareLinks() {
	const html = `
		<div data-o-component="o-share" class="o-share" id="element">
			<ul>
				<li class="o-share__action">
					<button class="o-share__icon o-share__icon--mail">
						<span class="o-share__text">Mail</span>
					</button>
				</li>
				<li class="o-share__action">
					<a class="o-share__icon o-share__icon--x" href="https://x.com/intent/tweet?url=http:&#x2F;&#x2F;on.ft.com&#x2F;1mUdgA2&text=Pfizer+says+its+AstraZeneca+vow+over+big+UK+presence+is+binding&related=ftcompanies&via=FT">
						<span class="o-share__text">Twitter</span>
					</a>
				</li>
			</ul>
		</div>
		`;
	insert(html);
}

function insertShareComponent() {
	const data = {
		title: "Test Article",
		url: "https://www.ft.com/content/test",
		titleExtra: "Extra",
		summary: "Testing...",
		relatedXAccounts: "ftcompanies",
		socialNetworks: [
			{
				name: "Twitter",
				className: "x",
				link: "https://x.com/intent/tweet?url=http%3A%2F%2Fon.ft.com%2F1mUdgA2&text=US%20drugs&related=ftcompanies&via=FT",
			},
			{
				name: "Facebook",
				className: "facebook",
				link: "http://www.facebook.com/sharer.php?u=http%3A%2F%2Fon.ft.com%2F1mUdgA2",
			},
			{
				name: "LinkedIn",
				className: "linkedin",
				link: "http://www.linkedin.com/shareArticle?mini=true&url=http%3A%2F%2Fon.ft.com%2F1mUdgA2&title=US%20drugs+%7C+FT.com%20%7C%20Pharmaceuticals&summary=US%20drugs%20group%20vows%20to%20maintain%20big%20British%20presence&source=Financial+Times",
			},
			{
				name: "Whatsapp",
				className: "whatsapp",
				link: "whatsapp://send?text=US%20drugs%20(FT.com%20%7C%20Pharmaceuticals)%20-%20http%3A%2F%2Fon.ft.com%2F1mUdgA2",
			},
			{
				name: "Pinterest",
				className: "pinterest",
				link: "http://www.pinterest.com/pin/create/button/?url=http%3A%2F%2Fon.ft.com%2F1mUdgA2&description=US%20drugs",
			},
		],
	};
	const html = `
		<div data-o-component="o-share" class="o-share">
			<ul>
				${data.socialNetworks.map(network => {
					return `
						<li class="o-share__action">
							<a
								class="o-share__icon o-share__icon--${network.className}"
								href="${network.link}"
								rel="noopener"
							>
								<span class="o-share__text">
									Share ${data.title} on ${network.name} (opens a new window)
								</span>
							</a>
						</li>
					`;
				})}
			</ul>
		</div>
		`;
	insert(html);
}

export {
	insertShareLinks,
	insertShareComponent,
	reset,
};
