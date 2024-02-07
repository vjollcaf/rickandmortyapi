<script setup lang="ts">
import Card from '~/components/Card.vue';
import FilterComponent from '~/components/FilterComponent.vue';
import { useEpisodesStore } from '~/stores/episodes';

const store = useEpisodesStore();
store.fetchEpisodes();

const handleLoadMore = () => {
	store.currentPage++;
	store.fetchEpisodes();
};
</script>

<template>
	<div class="location-cards">
		<img src="/episodes-banner.png" alt="" srcset="" />
		<FilterComponent :filtertype="'episodes'" />
		<Card :items="store.episodes" :type="'episodes'" />
		<button :disabled="store.currentPage === store.totalPages" class="btn btn-loadmore" @click="handleLoadMore">
			Load More
		</button>
	</div>
</template>

<style scoped>
.character-list {
	list-style-type: none;
	padding: 0;
}

.character-list li {
	margin-bottom: 5px;
	padding: 8px;
	background-color: #f0f0f0;
	border-radius: 4px;
	cursor: pointer;
}
</style>
