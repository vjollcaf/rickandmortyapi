import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRequest } from '@/composables';
import { IPhoto } from '@/types';

export const usePhotosStore = defineStore('photos', () => {
	const imageRequest = useRequest();

	// Data
	const photos = ref<IPhoto[]>([]);

	// Methods
	async function fetchPhotos() {
		try {
			const { data } = await imageRequest({ route: '/photos?_limit=50' });
			photos.value = data.value as IPhoto[];
		} catch (err) {
			console.error(err);
		}
	}
	return { photos, fetchPhotos };
});
