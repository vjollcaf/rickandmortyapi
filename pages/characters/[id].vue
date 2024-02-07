<template>
	<div class="episode-details">
		<div class="episode-details-wrap">
			<div class="details-top character">
				<div class="go-back-wrap">
					<p class="go-back"></p>
					<NuxtLink to="/locations">Go back</NuxtLink>
				</div>
				<div class="character-image-name">
					<img :src="character.image" alt="Character Image" />
					<h2>{{ character.name }}</h2>
				</div>
			</div>

			<div class="character-details">
				<div class="character-details-info">
					<h2>Informations</h2>
					<ul class="character-data">
						<li v-for="(value, key) in getDetails(character, 'character')" :key="key">
							<b class="character-data-bold">{{ key }}</b>
							<p class="character-data-gray">{{ value }}</p>
						</li>
					</ul>
				</div>

				<div class="character-details-episodes">
					<h2>Episodes</h2>
					<ul class="character-data episode">
						<li v-for="(episode, index) in episodesStore.episodeDetails" :key="index">
							<b class="character-data-bold">{{ episode.name }}</b>
							<b class="character-data-gray">{{ episode.episode }}</b>
							<p class="character-data-gray--s">{{ episode.air_date }}</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useCharacterStore } from '../../stores/characters';
import { useEpisodesStore } from '../../stores/episodes';

const route = useRoute();
const character = ref<any>({});
const characterStore = useCharacterStore();
const episodesStore: any = useEpisodesStore();

onMounted(async () => {
	const characterID = route.params.id as any;
	await characterStore.fetchCharacterById(characterID);
	character.value = characterStore.character;

	if (character.value.episode) {
		character.value.episodesDetails = await fetchEpisodesByIds(character.value.episode);
	}
});

const getDetails = (data: any, type: any) => {
	if (type === 'character') {
		return {
			Gender: data?.gender,
			Species: data?.species,
			Origin: data?.origin?.name,
			Type: data?.type,
			Location: data?.location?.name,
		};
	} else if (type === 'episodes') {
		return {
			Name: data?.name,
			AirDate: data?.air_date,
		};
	} else {
		return {};
	}
};

async function fetchEpisodesByIds(episodeUrls: Array<string>) {
	const episodeIds: Array<number | string> = episodeUrls.map((url) => {
		const match = url.match(/\/episode\/(\d+)/);
		return match ? parseInt(match[1], 10) : -1;
	});

	const episodeDetails = await fetchEpisodesDetailsByIds(episodeIds);
	return episodeDetails;
}

async function fetchEpisodesDetailsByIds(episodeIds: Array<string | number>) {
	const idList = episodeIds.join(',');
	console.log(idList);

	await episodesStore.getEpisodeDetailsByIds(idList);
	return episodesStore.episodesDetails;
}
</script>

<style></style>
