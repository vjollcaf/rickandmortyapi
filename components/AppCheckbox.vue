<script setup lang="ts">
// Props
interface Props {
	id: string;
}

defineProps<Props>();
</script>

<template>
	<div class="app-checkbox relative">
		<input :id="id" class="app-checkbox__input apperance-none absolute events-none" type="checkbox" />
		<label class="app-checkbox__label d-block pointer" :for="id" />
		<div class="app-checkbox__thumb absolute events-none radius-rounded absolute-y-center left-0" />
	</div>
</template>
<style scoped lang="scss">
$block: '.app-checkbox';

#{$block} {
	@include rem('margin', 10px);
	&__label {
		@include rem('width', 50px);
		@include rem('height', 27px);
		@include rem('border-radius', 20px);
		background: var(--bg-theme-toggler);
		transition: background var(--duration-theme-toggler) ease;
	}
	&__thumb {
		width: 50%;
		height: calc(100% - 0.1875rem);
		background: var(--bg-theme-toggler-thumb);
		transition: transform var(--duration-theme-toggler) ease;
	}
	&__input:checked ~ &__label {
		background: var(--bg-theme-toggler-active);
	}
	&__input:checked ~ &__thumb {
		transform: translate(100%, -50%);
	}
}
</style>
