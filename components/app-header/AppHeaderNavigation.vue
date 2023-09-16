<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';

// Declarations
const auth = useAuthStore();
</script>
<template>
	<nav class="app-header-navigation">
		<ul class="d-flex items-center">
			<template v-if="auth.isLogged">
				<li class="app-header-navigation__item">
					<RouterLink class="app-header-navigation__link" to="/">
						{{ $t('header.navigation.counter') }}
					</RouterLink>
				</li>
				<li class="app-header-navigation__item">
					<RouterLink class="app-header-navigation__link" to="/photos">
						{{ $t('header.navigation.photos') }}
					</RouterLink>
				</li>
			</template>
			<template v-else>
				<li class="app-header-navigation__item">
					<RouterLink class="app-header-navigation__link" to="/login">
						{{ $t('header.navigation.login') }}
					</RouterLink>
				</li>
			</template>
		</ul>
	</nav>
</template>
<style scoped lang="scss">
$block: '.app-header-navigation';

#{$block} {
	&__item {
		@include rem('margin-right', 30px);
	}
	&__link {
		color: var(--color-link);
		transition: color 0.3s ease;
		&:hover,
		&.router-link-active {
			color: var(--color-link-active);
		}
	}
}
</style>
