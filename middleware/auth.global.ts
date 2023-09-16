export default defineNuxtRouteMiddleware((to, from) => {
	const accessToken = useCookie('access_token');

	if (accessToken.value && to?.name === 'login') {
		return navigateTo('/');
	}

	if (!accessToken.value && to?.name !== 'login') {
		abortNavigation();
		return navigateTo('/login');
	}
});
