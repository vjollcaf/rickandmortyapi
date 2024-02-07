<script setup lang="ts">
// import AppHeaderNavigation from './AppHeaderNavigation.vue';
import AppHeader from './AppHeader.vue';
</script>
<template>
	<header class="app-header container">
		<!-- <AppHeaderNavigation /> -->
		second
		<AppHeader />
	</header>
</template>
<style scoped lang="scss">
$block: '.app-header';

#{$block} {
	@include rem('padding-top', 20px);

	@include rem('padding-bottom', 20px);
}
</style>
