<script setup lang="ts">
import 'flag-icons';
import { computed } from 'vue';
import locales from '@/assets/locales.json';

// Computed
const getLocaleKeys = computed<string[]>(() => Object.keys(locales));
</script>
<template>
	<ul class="d-flex fixed bottom-0 right-0">
		<li v-for="key in getLocaleKeys" :key="key" class="app-lang">
			<a role="button" @click="$i18n.locale = key">
				<span class="app-lang__flag" :class="`fi fi-${key}`" />
			</a>
		</li>
	</ul>
</template>
<style scoped lang="scss">
$block: '.app-lang';

#{$block} {
	@include rem('margin-right', 10px);
	@include rem('padding-bottom', 10px);
	&__flag {
		@include rem('width', 30px);
		@include rem('height', 30px);
	}
}
</style>
