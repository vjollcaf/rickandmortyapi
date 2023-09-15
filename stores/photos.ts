import { defineStore } from 'pinia';
import { ref } from 'vue';
import { IPhoto } from '../types';

const { $axios } = useNuxtApp();

export const usePhotosStore = defineStore('photos', () => {
	// Data
	const photos = ref<IPhoto[]>([]);

	// Methods
	async function fetchPhotos() {
		try {
			const { data } = await $axios().get('/photos?_limit=50');
			photos.value = data;
		} catch (err) {
			console.error(err);
		}
	}
	return { photos, fetchPhotos };
});
