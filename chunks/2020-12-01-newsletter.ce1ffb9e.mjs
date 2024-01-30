async function getMod() {
						return import('./2020-12-01-newsletter.d7ac104c.mjs');
					}
					const collectedLinks = "@@ASTRO-LINKS@@";
					const collectedStyles = "@@ASTRO-STYLES@@";
					const collectedScripts = "@@ASTRO-SCRIPTS@@";
					const defaultMod = { __astroPropagation: true, getMod, collectedLinks, collectedStyles, collectedScripts };

export { defaultMod as default };
