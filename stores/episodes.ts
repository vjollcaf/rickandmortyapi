// episodes.ts
import { defineStore } from 'pinia';

export const useEpisodesStore = defineStore('episodes', () => ({
	episodes: [],
	episodeDetails: [] as any,
	currentPage: 1,
	totalPages: 1,
	filters: {
		name: '', // Initialize with an empty string for default filtering
	},

	async fetchEpisodes(page = 1) {
		try {
			const { name } = this.filters;
			const query = `name=${name}`;
			const response = await fetch(`https://rickandmortyapi.com/api/episode?${query}`);
			const data = await response.json();

			// Concatenate the new episodes to the existing array
			console.log(data);
			this.episodes = this.episodes.concat(data.results);

			this.totalPages = data.info.pages;
		} catch (error) {
			console.error('Error fetching episodes:', error);
		}
	},

	async getEpisodeDetailsByIds(idList: any) {
		console.log(idList);
		try {
			const response = await fetch(`https://rickandmortyapi.com/api/episode/${idList}`);
			const data = await response.json();
			console.log(Array.isArray(data));
			if (!Array.isArray(data)) {
				this.episodeDetails = [data];
			} else {
				this.episodeDetails = data;
			}
		} catch (error) {
			console.error('Error fetching episode details:', error);
		}
	},
	async getEpisodeDetails(id: any) {
		try {
			const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
			const data = await response.json();

			this.episodeDetails = data;
		} catch (error) {
			console.error('Error fetching episode details:', error);
		}
	},

	applyFilters() {
		// Reset current page before applying filters
		this.currentPage = 1;
		this.episodes = []; // Clear existing data
		this.fetchEpisodes();
	},

	prevPage() {
		if (this.currentPage > 1) {
			this.fetchEpisodes(this.currentPage - 1);
		}
	},

	nextPage() {
		if (this.currentPage < this.totalPages) {
			this.fetchEpisodes(this.currentPage + 1);
		}
	},

	get allEpisodes() {
		return this.episodes;
	},
}));
