/// <reference types="vitest/config" />
import { defineConfig, loadEnv, type ProxyOptions } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
import path from 'path';

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig(({ mode }) => {
	const proxyConfig = getProxy(mode);
	return {
		plugins: [react(), tailwindcss()],
		server: {
			port: 5174, // Default frontend dev server port.
			strictPort: false, // Don't fail if 5174 is already taken.
			proxy: proxyConfig,
			watch: {
				usePolling: true,
				interval: 300,
			},
		},
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
	};
});

const getProxy = (
	mode: string
): Record<string, string | ProxyOptions> | undefined => {
	const env = loadEnv(mode, "../../", "");

	if (!env.VITE_BASE_URL) {
		return undefined;
	}

	return {
		"^/(app|api|assets|files|private|socket.io)": {
			target: env.VITE_BASE_URL,
			ws: true,
			changeOrigin: true,
			secure: false,
		},
	};
};
