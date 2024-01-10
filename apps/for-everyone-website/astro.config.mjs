import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';


// https://astro.build/config
export default defineConfig({
	vite: {
		ssr: {
			noExternal: ["unist-util-visit", "@financial-times/o3-button"],
		}
	},
	integrations: [
		react(),
		starlight({
			title: 'Origami For Everyone',
			locales: {
				root: {
				  label: 'core',
				  lang: 'en-GB-x-core', // lang is required for root locales
				},
				'professional': {
				  label: 'professional',
				  lang: 'en-GB-x-prof',
				},
				'sustainable-views': {
				  label: 'sustainable views',
				  lang: 'en-GB-x-sv',
				},
			},
			components: {
				Hero: './src/components/Hero.astro',
				ThemeProvider: './src/components/ThemeProvider.astro',
				LanguageSelect: './src/components/LanguageSelect.astro',
				ThemeSelect: './src/components/ThemeSelect.astro',
			},
			customCss: [
				'./src/styles/custom.css',
			],
			social: {
				github: 'https://github.com/financial-times/origami/',
			},
			head: [
		    // Example: add Fathom analytics script tag.
		    {
		      tag: 'script',
		      attrs: {
		        src: 'https://www.ft.com/__origami/service/build/v3/bundles/js?components=o-tracking@^4.5.0&system_code=origami-website',
		        defer: true,
		        onload: "initTracking()"
		      },
		    },
		    {
		      tag: 'script',
		      content: `
const oTracking = window.Origami['o-tracking'];

function getCookie(name) {
  const value = \`; \${document.cookie}\`;
  const parts = value.split(\`; \${name}=\`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
const oktaId = getCookie('oktaId');
if ((window.location.href.startsWith('https://origami.ft.com') || window.location.href.startsWith('https://origami-for-everyone.ft.com')) && oktaId) {
	oTracking.init({
		context: {
			product: 'engineering-enablement',
			app: 'origami-website',
		},
		user: {
			okta_id: oktaId,
			is_staff: true,
		},
	});
	// Send a page view tracking event.
	oTracking.page();
	// Track click events on the page.
	oTracking.click.init();
	// Track when elements with the attribute \`data-o-tracking-view\` are visible to the user.
	oTracking.view.init();
	// Tell o-tracking to listen for custom events named \`oTracking.event\`.
	oTracking.event.init();
} else {
	console.log('Skipping analytics - not a production site');
}

		      `
		    },
		  ],
			sidebar: [
				{
					label: 'About',
					autogenerate: { directory: 'about' },
				},
				{
					label: 'Foundations',
					autogenerate: { directory: 'guides' },
				},
				{
					label: 'Components',
					autogenerate: { directory: 'components' },
				},
				{
					label: 'Patterns',
					autogenerate: { directory: 'patterns' },
				},
			],
		}),
	],
});
