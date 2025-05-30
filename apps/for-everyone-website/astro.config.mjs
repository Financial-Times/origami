import {defineConfig} from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';
import svelte from '@astrojs/svelte';
import {redirects} from './redirects';
import remarkBrandedContent from './plugins/remark-branded-content.mjs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://astro.build/config
export default defineConfig({
	markdown: {
		remarkPlugins: [[remarkBrandedContent, {}]],
	},
	vite: {
		ssr: {
			noExternal: ['unist-util-visit', '@astrojs/internal-helpers'],
		},
		resolve: {
			alias: {
				'@': `${path.resolve(__dirname, 'src')}/`,
			},
		},
	},
	site: 'https://origami.ft.com/',
	redirects: redirects,
	integrations: [
		react(),
		starlight({
			title: 'Origami',
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'core',
					lang: 'en-GB-x-core', // lang is required for root locales
				},
				professional: {
					label: 'professional',
					lang: 'en-GB-x-prof',
				},
				'sustainable-views': {
					label: 'sustainable views',
					lang: 'en-GB-x-sv',
				},
				internal: {
					label: 'internal',
					lang: 'en-GB-x-internal',
				},
				whitelabel: {
					label: 'whitelabel',
					lang: 'en-GB-x-wl',
				},
			},
			components: {
				Hero: './src/components/Hero.astro',
				LanguageSelect: './src/components/LanguageSelect.astro',
				ContentPanel: './src/components/ContentPanel.astro',
				ThemeSelect: './src/components/EmptyComponent.astro',
				ThemeProvider: './src/components/ThemeProvider.astro',
				SocialIcons: './src/components/NavLinks.astro',
				FallbackContentNotice: './src/components/FallbackContentNotice.astro',
			},
			customCss: ['./src/styles/custom.css'],
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
					},
				},
			],
			expressiveCode: {
				themes: ['dracula', 'solarized-light'],
			},
			sidebar: [
				{
					label: 'About',
					collapsed: true,
					autogenerate: {
						directory: 'about',
					},
				},
				{
					label: 'Getting Started',
					collapsed: true,
					autogenerate: {
						directory: 'getting-started',
					},
				},
				{
					label: 'Contribution',
					collapsed: true,
					autogenerate: {
						directory: 'contribution',
					},
				},
				{
					label: 'Foundations (o3)',
					autogenerate: {
						directory: 'guides',
					},
				},
				{
					label: 'Components (o3)',
					autogenerate: {
						directory: 'components',
						collapsed: true,
					},
				},
				{
					label: 'Patterns (o3)',
					autogenerate: {
						directory: 'patterns',
					},
				},
				{
					label: 'Components (o2)',
					collapsed: true,
					autogenerate: {
						directory: 'o2-components',
					},
				},
				{
					label: 'Blog',
					link: '/blog/',
				},
			],
		}),
		svelte(),
	],
});
