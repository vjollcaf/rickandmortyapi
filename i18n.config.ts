import locales from '@/lang/locales.json';

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    messages: locales,
  }))