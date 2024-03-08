<template>
	<div class="characters-home">
		<img src="/banner-img.png" alt="" srcset="" />
		<FilterComponent :filtertype="'characters'" @apply-filters="applyCharacterFilters" />
		<Card :items="store.characters" :type="'characters'" />
	</div>
</template>

<script setup lang="ts">
import Card from '~/components/Card.vue';
import FilterComponent from '~/components/FilterComponent.vue';
import { useCharacterStore } from '~/stores/characters';

const store = useCharacterStore();
store.fetchCharacters();

const applyCharacterFilters = (filters: any) => {
	store.filterCharacters(filters);
};
</script>

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
