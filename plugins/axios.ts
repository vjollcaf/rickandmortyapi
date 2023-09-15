import axios, { Axios } from 'axios';

export default defineNuxtPlugin(() => {
	const runtimeConfig = useRuntimeConfig();
	const token = useCookie('access_token');
	const url = runtimeConfig.public.apiUrl || '';

	const axiosInstance: Axios = axios.create({
		baseURL: url,
	});

	axiosInstance.interceptors.request.use(
		(config) => {
			const accessToken = token.value || '';

			if (accessToken) {
				config.headers.Authorization = `Bearer ${accessToken}`;
			}
			return config;
		},
		(err) => {
			return Promise.reject(err);
		}
	);

	return {
		provide: {
			axios: () => axiosInstance,
		},
	};
});
