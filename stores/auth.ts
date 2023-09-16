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

		accessToken.value = 'test';
	}
	return { accessToken, login, isLogged };
});
