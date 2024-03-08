<template>
	<div class="location-cards">
		<div class="location-banner">
			<img src="/location-banner.jpg" alt="" srcset="" />
			<FilterComponent :filtertype="'locations'" />
		</div>
		<loading :loading="isLoading"></loading>
		<Card :items="location.locations" :type="'locations'" />
		<div v-if="currentPage < location.totalPages && !isLoading" class="load-more">
			<button class="btn btn-loadmore" @click="loadMore">{{ isLoading ? '...' : 'Load More' }}</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Card from '~/components/Card.vue';
import FilterComponent from '~/components/FilterComponent.vue';
import { useLocationsStore } from '~/stores/locations';

const location = useLocationsStore();
const currentPage = ref(1);
const isLoading = ref(false);

const loadMore = async () => {
	isLoading.value = true;
	currentPage.value += 1;
	await location.fetchLocations(currentPage.value);
	isLoading.value = false;
};

onMounted(async () => {
	isLoading.value = true;
	await location.fetchLocations();
	isLoading.value = false;
});

// Debounce function implementation
const debounce = (func: Function, delay: number) => {
	let timeoutId: ReturnType<typeof setTimeout> | null = null;
	return (...args: any[]) => {
		if (timeoutId) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			func(...args);
		}, delay);
	};
};

// Create a debounced version of applyFilters
const debouncedApplyFilters = debounce(() => location.applyFilters(), 300);

// Handle input changes with debounced applyFilters
const handleInput = () => {
	debouncedApplyFilters();
};
</script>

<style scoped>
.location-list {
	list-style-type: none;
	padding: 0;
}

.location-list li {
	margin-bottom: 5px;
	padding: 8px;
	background-color: #f0f0f0;
	border-radius: 4px;
	cursor: pointer;
}

.load-more {
	margin-top: 20px;
}

button {
	cursor: pointer;
}
</style>
