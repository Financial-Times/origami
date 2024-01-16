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
				LanguageSelect: './src/components/LanguageSelect.astro',
				ContentPanel: './src/components/ContentPanel.astro',
				ThemeSelect: './src/components/EmptyComponent.astro',
			},
			customCss: [
				'./src/styles/custom.css',
			],
			social: {
				github: 'https://github.com/financial-times/origami/',
			},
			head: [
		    {
		      tag: 'script',
		      attrs: {
		        src: 'https://www.ft.com/__origami/service/build/v3/bundles/js?components=o-tracking@^4.5.0&system_code=origami-website',
		        defer: true,
		      },
		    },
		    {
		      tag: 'script',
		      attrs: {
		        src: '/js/tracking.js',
		        defer: true,
		      }
		    }
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
