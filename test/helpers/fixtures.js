const withPrimaryNav = `
<header class="o-header-services " data-o-component="o-header-services">
	<div class="o-header-services__top">
			<div class="o-header-services__hamburger">
				<a class="o-header-services__hamburger-icon" href="#" role="button">
					<span class="o-header-services__visually-hidden">Open primary navigation</span>
				</a>
			</div>
		<div class="o-header-services__logo"></div>
		<div class="o-header-services__title">
			<a class="o-header-services__product-name" href="/">Tool or Service name</a>
			<span class="o-header-services__product-tagline">Tagline to explain the product here</span>
		</div>
		<ul class="o-header-services__related-content">
			<li>
				<a href="">XXXX</a>
			</li>
			<li>
				<a href="">Sign in</a>
			</li>
		</ul>
	</div>

	<nav class="o-header-services__primary-nav" aria-label="primary">
		<ul class="o-header-services__primary-nav-list">
			<li data-o-header-services-level="1">
				<a aria-current="page" href="">Fruit</a><!--
				--><button class="o-header-services__drop-down-button" type="button" name="button" aria-label="Toggle dropdown menu"></button>
				<ul data-o-header-services-level="2" aria-hidden="true">
                    <li>
                        <a href="#">Fruit</a>
                    </li>
                    <li>
                        <a href="#">Apples & Pears</a>
                    </li>
                    <li>
                        <a href="#">Citrus</a>
                    </li>
                    <li>
                        <a href="#">Stone fruit</a>
                    </li>
                    <li>
                        <a href="#">Tropical / Exotic</a>
                    </li>
                    <li>
                        <a href="#">Berries</a>
                    </li>
                    <li>
                        <a href="#">Melons</a>
                    </li>
                    <li>
                        <a href="#">Tomatoes & Avocados</a>
                    </li>
					<button class="o-header-services__visually-hidden" type="button" name="button">Close dropdown menu</button>
				</ul>
			</li>
			<li data-o-header-services-level="1">
				<a href="">Vegetables</a><!--
				--><button class="o-header-services__drop-down-button" type="button" name="button" aria-label="Toggle dropdown menu"></button>
				<ul data-o-header-services-level="2" aria-hidden="true">
                    <li>
                        <a href="#">Vegetables</a>
                    </li>
                    <li>
                        <a href="#">Leafy green</a>
                    </li>
                    <li>
                        <a href="#">Cruciferous</a>
                    </li>
                    <li>
                        <a href="#">Marrow</a>
                    </li>
                    <li>
                        <a href="#">Root</a>
                    </li>
                    <li>
                        <a href="#">Edible plant stem</a>
                    </li>
                    <li>
                        <a href="#">Allium</a>
                    </li>
					<button class="o-header-services__visually-hidden" type="button" name="button">Close dropdown menu</button>
				</ul>
			</li>
		</ul>
	</nav>

</header>`;

export {
	withPrimaryNav
};
