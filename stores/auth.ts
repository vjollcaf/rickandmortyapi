import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
	// Data
	const accessToken = useCookie('access_token');

	//   Computed
	const isLogged = computed<boolean>(() => !!accessToken.value);

	// Methods
	function login() {
		// Request to login...

		accessToken.value = window.localStorage.getItem('access_token') || '';
	}
	return { accessToken, login, isLogged };
});
