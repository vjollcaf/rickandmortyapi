<script setup lang="ts">
import AppModal from './AppModal.vue';
import { useModal } from '@/composables';
import { IPhoto } from '@/types';

const { showModal, modalAction } = useModal();

// Props
interface Props {
	photo: IPhoto;
}
defineProps<Props>();
</script>
<template>
	<article class="app-photo" @click="modalAction(!showModal)">
		<AppModal :show-modal="showModal" :thumbnail-url="photo.thumbnailUrl" />
		<NuxtImg class="w-full h-full object-fit-contain" :src="photo.thumbnailUrl" alt="album photo" />
	</article>
</template>
