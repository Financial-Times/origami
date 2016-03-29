const timeout = 20000;
const wait = 1000;

module.exports = {

	before: function (browser) {
		browser.url(browser.launch_url + "/modal.html");
	},

	'Step 1: Open page at 800 x 800': function (browser) {
		browser
			.waitForElementVisible("button.o-overlay-trigger", timeout)
			.pause(wait)
			.windowSize('current', 800, 800);
	},

	'Step 2: Test modal overlay loads': function (browser) {
		browser
			.click("button.o-overlay-trigger")
			.pause(wait)
			.waitForElementVisible(".o-overlay--modal", timeout)
			.pause(wait)
			.assert.elementPresent(".o-overlay-shadow", "Found overlay-shadow; this is a modal overlay")
			.assert.cssPropertyEither(".o-overlay-shadow", "background-color", "rgba(0, 0, 0, 0.2)", "transparent")
			.assert.cssProperty(".o-overlay__heading", "background-color", "rgba(116, 115, 108, 1)")
			.assert.containsText(".o-overlay__content", "Overlay content.")
			.isVisible(".o-overlay__content", function (result) {
				this.assert.equal(result.value, true, "Overlay content is visible");
			})
			.isVisible(".o-overlay__close", function (result) {
				this.assert.equal(result.value, true, "Overlay close button is visble");
			});

	},

	'Step 3: Test text can be entered into input fields': function (browser) {
		browser
			.setValue(".o-overlay__content>input#username", "username")
			.setValue(".o-overlay__content>input#password", "password");
	},

	// Module should render in the middle of the page.  Since we know this browser is set
	// to 800 px wide, we're only testing that it appears within the boundaries of the
	// middle third of the page.
	'Step 4: Check overlay placement': function (browser) {
		const window_width = 800;
		const window_first_third = window_width / 3;
		const window_second_third = window_first_third * 2;
		let overlay_left;
		let overlay_right;

		browser
			.getLocation(".o-overlay--modal", function (location) {
				overlay_left = location.value.x;
				this.getElementSize(".o-overlay--modal", function (size) {
					overlay_right = overlay_left + size.value.width;
					this.assert.ok(overlay_left > window_first_third, "Left side of overlay appears centered on the page");
					this.assert.ok(overlay_right < window_second_third, "Right side of overlay appears centered on the page");
				});
			});
	},

	'Step 5: Verify scrollbars appear when page is shortened': function (browser) {
		let scrollHeight = 0;
		let clientHeight = 0;

		browser
			.resizeWindow(800, 400)
			.pause(wait)
			.execute(function () {
				scrollHeight = document.querySelectorAll(".o-overlay__content")[0].scrollHeight;
				clientHeight = document.querySelectorAll(".o-overlay__content")[0].clientHeight;
				return {scroll: scrollHeight, client: clientHeight};
			}, [], function (result) {
				scrollHeight = result.value.scroll;
				clientHeight = result.value.client;
				this.assert.ok(scrollHeight > clientHeight, "When the windows became smaller than the overlay content, the overlay did not appear scrollable");

			});

	},

	'Step 6: Close the overlay': function (browser) {
		browser
			.click(".o-overlay__close")
			.pause(1000)
			.waitForElementNotPresent("o-overlay--modal", wait);
	},

	after: function (browser) {
		browser.end();
	}
};
