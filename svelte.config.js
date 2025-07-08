import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// 環境変数に基づいてアダプターを動的にインポートする
const useStaticAdapter = process.env.DOCKER === 'true';

const adapterModule = useStaticAdapter
  ? await import('@sveltejs/adapter-static')
  : await import('amplify-adapter');

const adapter = adapterModule.default;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		})
	}
};

export default config;