<script setup lang="ts">
import AppPhoto from '@/components/AppPhoto.vue';
import { usePhotosStore } from '@/stores/photos';

// Declarations
const photos = usePhotosStore();

// Created
photos.fetchPhotos();
</script>
<template>
	<div class="app-photos container">
		<h1 class="app-photos__title">
			{{ $t('pages.photos.title') }}
		</h1>
		<div class="app-photos__grid d-flex">
			<AppPhoto v-for="photo in photos.photos" :key="photo.id" :photo="photo" />
		</div>
	</div>
</template>
<style scoped lang="scss">
$block: '.app-photos';

#{$block} {
	&__title {
		@include rem('margin-bottom', 20px);
		font-size: var(--size-page-title);
	}
	&__grid {
		@include grid(7, 1fr, null, null, 1.25rem);
		@include tablet {
			@include grid(5, 1fr, null, null, 1.25rem);
		}
		@include mobile {
			@include grid(3, 1fr, null, null, 0.625rem);
		}
	}
}
</style>
