// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ['@pinia/nuxt', '@nuxt/image', '@nuxtjs/i18n'],
	css: ['~/assets/scss/main.scss'],
	pinia: {
		autoImports: [
			// automatically imports `defineStore`
			'defineStore', // import { defineStore } from 'pinia'
			['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
		],
	},
	i18n: {
		vueI18n: './i18n.config.ts', // if you are using custom path, default
	},
	runtimeConfig: {
		public: {
			apiUrl: process.env.API_URL || '',
		},
	},
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "@/assets/scss/partials/_mixins.scss" as *;',
				},
			},
		},
	},
});
