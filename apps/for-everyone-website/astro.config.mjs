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
