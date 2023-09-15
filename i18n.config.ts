import locales from '@/assets/locales.json';

export default defineI18nConfig(() => ({
	legacy: false,
	locale: 'en',
	messages: locales,
}));
