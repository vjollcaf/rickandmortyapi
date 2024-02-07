<template>
	<div class="episode-details">
		<div class="episode-details-wrap">
			<div class="details-top">
				<div class="go-back-wrap">
					<p class="go-back"></p>
					<NuxtLink to="/locations">Go back</NuxtLink>
				</div>
				<div class="">
					<p class="details-title">{{ locationDetail.name }}</p>
				</div>
			</div>
			<div class="info">
				<div class="info-left">
					<p>Type</p>
					<p>{{ locationDetail.type }}</p>
				</div>
				<div class="info-right">
					<p>Dimesion</p>
					<p>{{ locationDetail.dimension }}</p>
				</div>
			</div>
		</div>
		<div class="cast">
			<p>RESIDENTS</p>
			<Card :type="'characters'" :items="getLocationResidents()" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useCharacterStore, useLocationsStore } from '#imports';
import Card from '~/components/Card.vue';

function extractCharacterIds(characterUrls: string[]): number[] {
	return characterUrls.map((url) => {
		const match = url.match(/\/character\/(\d+)/);
		return match ? parseInt(match[1], 10) : -1;
	});
}

function fetchCharactersByIds(characterIds: number[]) {
	const idList = characterIds.join(',');
	locationStore.fetchAndSetResidentsDetails(idList as any);
	return locationStore.residents;
}

const route = useRoute();
const locationDetail = ref<any>({});
const locationStore = useLocationsStore();
const characterStore = useCharacterStore();
const locationResidents = ref<Array<string>>([]);

onMounted(async () => {
	const episodeId = route.params.id;

	await locationStore.getLocationDetails(episodeId);
	locationDetail.value = locationStore.locationDetails;

	// Extract character IDs from episodeDetails.characters
	const characterUrls = locationDetail.value.residents || [];
	const characterIds = extractCharacterIds(characterUrls);

	// Fetch character details based on IDs
	locationResidents.value = await fetchCharactersByIds(characterIds);
});
function getLocationResidents() {
	if (locationStore.residents.length < 2 || locationStore.residents.length === undefined) {
		return locationStore.resident;
	} else {
		return locationStore.residents;
	}
}
</script>
