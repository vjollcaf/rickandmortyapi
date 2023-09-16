import locales from '@/assets/locales.json';

export default defineI18nConfig(() => ({
	legacy: false,
	locale: 'gb',
	messages: locales,
}));
