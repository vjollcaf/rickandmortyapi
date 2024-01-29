import type { WatchSource } from 'nuxt/dist/app/compat/capi';

interface useRequestOptions {
	authRequest?: boolean;
	baseUrl?: string;
}

type UseFetchOptions<DataT> = {
	key?: string;
	method?: string;
	query?: any;
	params?: any;
	body?: RequestInit['body'] | Record<string, any>;
	headers?: Record<string, string> | [key: string, value: string][] | Headers;
	baseURL?: string;
	server?: boolean;
	lazy?: boolean;
	immediate?: boolean;
	getCachedData?: (key: string) => DataT;
	deep?: boolean;
	default?: () => DataT;
	transform?: (input: DataT) => DataT;
	pick?: string[];
	watch?: WatchSource[] | false;
};

export function useRequest(config?: useRequestOptions) {
	const accessToken = useCookie('access_token');
	const runtimeConfig = useRuntimeConfig();
	const baseURL = config?.baseUrl ? config.baseUrl : runtimeConfig.public.apiUrl || '';
	const authRequest = config?.authRequest ? config.authRequest : true;

	return async (
		options?: useRequestOptions & { route: string } & UseFetchOptions<any>,
		onRequestHandler?: Function,
		onResponseHandler?: Function,
		onResponseErrorHandler?: Function
	) => {
		const { authRequest: authReq, baseUrl, route, ...restConfig } = options || {};

		const url = (options?.baseUrl ? options?.baseUrl : baseURL) + options?.route;
		const auth = authReq || authRequest;

		const handlers = {
			onRequest({ options }: any) {
				if (typeof onRequestHandler === 'function') {
					onRequestHandler(options);
					return;
				}

				options.headers = options.headers || {};
				if (auth) {
					options.headers.authorization = accessToken.value;
				}
			},
			onResponse({ request, response, options }: any) {
				if (typeof onResponseHandler === 'function') {
					onResponseHandler(request, response, options);
					return;
				}

				console.info('onResponse, request', request);
				console.info('onResponse, response', response);
				console.info('response, options', options);
			},
			onResponseError({ request, response, options }: any) {
				if (typeof onResponseErrorHandler === 'function') {
					onResponseErrorHandler(request, response, options);
					return;
				}

				if (response.status === 401 && auth) {
					// Logout
					accessToken.value = '';
				}
			},
		};
		return await useFetch(url, {
			...handlers,
			...(restConfig || {}),
		});
	};
}
