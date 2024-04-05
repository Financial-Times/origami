/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    includeSource: ['scripts/**/*.{js,ts}'],
  },
	define: {
		'import.meta.vitest': process.env.NODE_ENV == 'production' && 'undefined',
	},
})
