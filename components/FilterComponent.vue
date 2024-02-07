<template>
	<div class="filters">
		<div v-if="filtertype === 'characters'" class="filter-group">
			<label class="filter-label characters">
				<span class="filter-icon"></span>
				<input v-model="filters.name" class="filter-input" placeholder="Filter by name..." @input="handleInput" />
			</label>
			<label class="filter-label characters">
				<div class="custom-select-wrapper">
					<select v-model="filters.species" class="filter-select" @change="applyFilters">
						<option value="" disabled selected>Species</option>
						<option value="Human">Human</option>
						<option value="Alien">Alien</option>
					</select>
				</div>
			</label>
			<label class="filter-label characters">
				<div class="custom-select-wrapper">
					<select v-model="filters.gender" class="filter-select" @change="applyFilters">
						<option value="" disabled selected>Gender</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
						<option value="genderless">Genderless</option>
						<option value="unknown">Unknown</option>
					</select>
				</div>
			</label>
			<label class="filter-label characters">
				<div class="custom-select-wrapper">
					<select v-model="filters.status" class="filter-select" @change="applyFilters">
						<option value="" disabled selected>Status</option>
						<option value="Alive">Alive</option>
						<option value="Dead">Dead</option>
						<option value="unknown">Unknown</option>
					</select>
				</div>
			</label>
		</div>

		<div v-if="filtertype === 'locations'" class="filter-group">
			<label class="filter-label">
				<span class="filter-icon"></span>
				<input v-model="filters.name" class="filter-input" placeholder="Filter by Name" @input="handleInput" />
			</label>
			<label class="filter-label">
				<div class="custom-select-wrapper">
					<select v-model="filters.dimension" class="filter-select" @change="applyFilters">
						<option value="" disabled selected>Filter by Dimension</option>
						<option value="earth">Earth</option>
						<option value="C-137">Dimension C-137</option>
					</select>
				</div>
			</label>
		</div>

		<div v-if="filtertype === 'episodes'" class="filter-group">
			<label class="filter-label filter-label--episodes">
				<span class="filter-icon"></span>
				<input
					v-model="filters.name"
					class="filter-input"
					placeholder="Filter by Name or Episode"
					@input="handleInput" />
			</label>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { useCharacterStore } from '../stores/characters';
import { useEpisodesStore } from '../stores/episodes';
import { useLocationsStore } from '../stores/locations';

// eslint-disable-next-line vue/require-prop-types
const { filtertype } = defineProps(['filtertype']);

const charactersStore = useCharacterStore();
const episodesStore = useEpisodesStore();
const locationStore = useLocationsStore();

const filters = ref({
	name: '',
	species: '',
	gender: '',
	status: '',
	type: '',
	dimension: '',
});

let timeout: ReturnType<typeof setTimeout> | null = null;

const applyFilters = () => {
	if (filtertype === 'characters') {
		charactersStore.filters = filters.value;
		charactersStore.filterCharacters(filters.value);
	}
	if (filtertype === 'episodes') {
		episodesStore.filters = filters.value;
		episodesStore.applyFilters();
	}
	if (filtertype === 'locations') {
		locationStore.filters = filters.value;
		locationStore.applyFilters();
	}
};

const debounceApplyFilters = () => {
	if (timeout) {
		clearTimeout(timeout);
	}
	timeout = setTimeout(() => {
		applyFilters();
	}, 300);
};

const handleInput = () => {
	debounceApplyFilters();
};
</script>

<style scoped></style>
