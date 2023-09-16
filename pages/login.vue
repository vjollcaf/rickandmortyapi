<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

// Declarations
const auth = useAuthStore();
const router = useRouter();
// Methods
const login = () => {
	auth.login();

	router.push({ path: '/' });
};
</script>
<template>
	<div class="container">
		<h1 class="page-title">Login</h1>

		<form @submit.prevent="login">
			<button type="submit">Login</button>
		</form>
	</div>
</template>
