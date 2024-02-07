<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useCharacterStore } from '../../stores/characters';
import { useEpisodesStore } from '../../stores/episodes';
import { type Character, type Episode } from '~/types';

function extractCharacterIds(characterUrls: string[]): number[] {
	return characterUrls.map((url) => {
		const match = url.match(/\/character\/(\d+)/);
		return match ? parseInt(match[1], 10) : -1;
	});
}

async function fetchCharactersByIds(characterIds: number[]): Promise<Character[]> {
	const idList: string[] = characterIds.map((id) => id.toString()).join(',') as any;

	await characterStore.fetchAndSetCharacterDetails(idList);

	return characterStore.characters;
}

const route = useRoute();
const episodeDetail = ref<Episode>({});
const episodeStore = useEpisodesStore();
const characterStore = useCharacterStore();
let episodeCharacters: Character[] = [];
// const episodeCharacters = ref<Character[]>([]);
// let episodeDetail = {} as Episode;

onMounted(async () => {
	const episodeId = route.params.id;
	await episodeStore.getEpisodeDetails(episodeId);

	episodeDetail.value = episodeStore.episodeDetails as Episode;

	const characterUrls = episodeDetail.value.characters || [];
	const characterIds = extractCharacterIds(characterUrls);

	episodeCharacters = await fetchCharactersByIds(characterIds);
});

function getEpisodesCast(): Character[] {
	if (characterStore.characters.length < 2 || characterStore.characters.length === undefined) {
		return [];
	} else {
		return characterStore.characters;
	}
}
</script>

<template>
	<div class="episode-details">
		<div class="episode-details-wrap">
			<div class="details-top">
				<div class="go-back-wrap">
					<p class="go-back"></p>
					<NuxtLink to="/episodes">Go back</NuxtLink>
				</div>
				<div class="">
					<p class="details-title">{{ episodeDetail.name }}</p>
				</div>
			</div>
			<div class="info">
				<div class="info-left">
					<p>Episode</p>
					<p>{{ episodeDetail.episode }}</p>
				</div>
				<div class="info-right">
					<p>Date</p>
					<p>{{ episodeDetail.air_date }}</p>
				</div>
			</div>
		</div>
		<div class="cast">
			<p>CAST</p>
			<!-- Use double curly braces for data binding -->
			<Card :type="'characters'" :items="getEpisodesCast()" />
		</div>
	</div>
</template>
