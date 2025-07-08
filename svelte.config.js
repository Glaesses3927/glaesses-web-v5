import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// 環境変数に基づいてアダプターを動的にインポートする
const useStaticAdapter = process.env.DOCKER === 'true';

const adapterModule = useStaticAdapter
  ? await import('@sveltejs/adapter-auto')
  : await import('amplify-adapter');

const adapter = adapterModule.default;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter()
	}
};

export default config;