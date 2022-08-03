import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				'disclosure-widget': resolve(
					__dirname,
					'demo/disclosure-widget/index.html'
				),
				'synchronous-inline-script': resolve(
					__dirname,
					'demo/synchronous-inline-script/index.html'
				),
				'target-pseudo-class': resolve(
					__dirname,
					'demo/target-pseudo-class/index.html'
				),
				'noscript-element': resolve(
					__dirname,
					'demo/noscript-element/index.html'
				),
			},
		},
	},
});
