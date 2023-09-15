export function useRequest(authRequest: boolean = true) {
	const accessToken = useCookie('access_token');
	const handlers = {
		onRequest({ options }: any) {
			options.headers = options.headers || {};
			if (authRequest) {
				options.headers.authorization = accessToken.value;
			}
		},
	};
	return {
		get: (url: string, options: any) => {
			return useFetch(url, {
				method: 'GET',
				...handlers,
				...options,
			});
		},
		post: (url: string, options: any) => {
			return useFetch(url, { method: 'POST', ...handlers, ...options });
		},
		put: (url: string, options: any) => {
			return useFetch(url, { method: 'PUT', ...handlers, ...options });
		},
		delete: (url: string, options: any) => {
			return useFetch(url, { method: 'DELETE', ...handlers, ...options });
		},
		patch: (url: string, options: any) => {
			return useFetch(url, { method: 'PATCH', ...handlers, ...options });
		},
	};
}
