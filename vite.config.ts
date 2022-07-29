import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				synchronousInlineScriptDemo: resolve(
					__dirname,
					'demo/synchronous-inline-script/index.html'
				),
			},
		},
	},
});
