import { AsyncData } from 'nuxt/app';

enum HttpMethods {
	POST,
	GET,
	PUT,
	PATCH,
	DELETE,
}

interface HttpFunctions {
	[key: string]: (url: string, options?: any) => AsyncData<any, any>;
}

export function useRequest(authRequest: boolean = true) {
	const accessToken = useCookie('access_token');
	const runtimeConfig = useRuntimeConfig();
	const baseURL = runtimeConfig.public.apiUrl || '';

	const handlers = {
		onRequest({ options }: any) {
			options.headers = options.headers || {};
			if (authRequest) {
				options.headers.authorization = accessToken.value;
			}
		},
	};

	const httpFunctions: HttpFunctions = {};
	const httpMethods: Array<string> = Object.keys(HttpMethods).filter((v) => isNaN(Number(v)));

	for (const httpMethod of httpMethods) {
		httpFunctions[httpMethod.toLowerCase()] = (url: string, options?: any) => {
			const fullUrlPath = baseURL + url;
			return useFetch(fullUrlPath, {
				method: httpMethod,
				...handlers,
				...options,
			});
		};
	}

	return httpFunctions;
}
