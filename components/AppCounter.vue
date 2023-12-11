<script setup lang="ts">
import { useCounterStore } from '../stores/counter';
import { useRequest } from '@/composables';

const request = await useRequest({ baseUrl: 'https://jsonplaceholder.typicode.com' });
const { data } = await request({ prefix: '/posts', pick: ['title'] });
const count = useCounterStore();
</script>
<template>
	<div class="app-counter d-flex flex-column items-center">
		<p class="app-counter__count">
			{{ count.count }}
		</p>
		<a role="button" class="app-counter__button app-button" @click="count.increment()">{{
			$t('pages.counter.increment')
		}}</a>
		<a role="button" class="app-counter__button app-button" @click="count.decrement()">{{
			$t('pages.counter.decrement')
		}}</a>
	</div>
</template>
<style scoped lang="scss">
$block: '.app-counter';

#{$block} {
	--button-margin: 0.625rem;
	&__count {
		font-size: var(--size-title);
	}
	&__button {
		margin-bottom: var(--button-margin);
	}
}
</style>
