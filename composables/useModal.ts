import { ref } from 'vue';

export function useModal() {
	const showModal = ref(false);

	const modalAction = (action: boolean): void => {
		showModal.value = action;
	};

	return { showModal, modalAction };
}
