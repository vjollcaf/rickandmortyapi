<script setup lang="ts">
interface Props {
	showModal: boolean;
	thumbnailUrl: string;
}
defineProps<Props>();
</script>
<template>
	<div class="app-modal" :class="{ 'app-modal--open': showModal }">
		<div class="app-modal__container">
			<div class="app-modal__container-image">
				<img class="w-full h-full object-fit-contain" :src="thumbnailUrl" alt="album photo" />
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.app-modal {
	position: fixed;
	display: flex;
	align-items: center;
	left: 0;
	top: 0;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.5);
	width: 100vw;
	height: 100vh;
	z-index: -1;
	opacity: 0;

	&--open {
		z-index: 9999;
		opacity: 1;
		transition: opacity 0.3s ease-in-out;
	}

	&__container {
		@include rem('width', 300px);
		@include rem('height', 300px);
		background-color: white;
	}
}
</style>
