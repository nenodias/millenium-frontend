import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfigExport } from 'vite';
import { defineConfig } from 'vite';

const config: UserConfigExport = defineConfig({
	plugins: [sveltekit()]
});

export default config;
