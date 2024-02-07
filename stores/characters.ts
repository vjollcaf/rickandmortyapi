// Updated useCharacterStore
import { defineStore } from 'pinia';
import { type Character } from '../types/character';

const API_BASE_URL = 'https://rickandmortyapi.com/api/character';

export const useCharacterStore = defineStore('character', () => ({
	characters: [] as Character[],
	character: {},
	filters: {},

	async fetchDataFromApi(url: string) {
		try {
			const response = await fetch(url);
			return response.json();
		} catch (error) {
			console.error('Error fetching data:', error);
			throw error;
		}
	},

	async fetchCharacters() {
		const url = `${API_BASE_URL}`;
		const data = await this.fetchDataFromApi(url);
		this.characters = data.results;
	},

	async filterCharacters(
		filters: { name?: string; status?: string; species?: string; type?: string; gender?: string } = {}
	) {
		const query = new URLSearchParams(filters).toString();
		const url = `${API_BASE_URL}?${query}`;
		const data = await this.fetchDataFromApi(url);
		this.characters = data.results;
	},
	async fetchAndSetCharacterDetails(idList: string[]) {
		try {
			const response = await fetch(`https://rickandmortyapi.com/api/character/${idList}`);
			const data = await response.json();
			this.characters = data;
			if (typeof data === 'object') {
				this.character = [data];
				this.characters = [data];
			}
			if (data?.results) {
				this.characters = data.results;
			} else {
				this.characters = data;
			}
		} catch (error) {
			console.error('Error fetching character details:', error);
			throw error;
		}
	},

	async fetchCharacterById(id: string) {
		const url = `${API_BASE_URL}/${id}`;
		const data = await this.fetchDataFromApi(url);
		console.log('respo', data);
		this.character = data;
	},

	get allCharacters() {
		return this.characters;
	},
}));
