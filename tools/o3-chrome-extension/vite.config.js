import {defineConfig} from 'vite';

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				'js/background': './src/js/background.js',
				'js/content': './src/js/content.js',
				'popup': './popup.html',
			},
			output: {
				entryFileNames: '[name].js',
				chunkFileNames: 'assets/js/[name].js',
				assetFileNames: 'assets/[name].[ext]'
			},
		},
		sourcemap: true,
	},
	publicDir: 'public'
});
