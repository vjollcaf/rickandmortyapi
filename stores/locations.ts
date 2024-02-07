// locations.ts
import { defineStore } from 'pinia';

export const useLocationsStore = defineStore('locations', () => ({
	locations: [] as Location[],
	locationDetails: {} as Location,
	residents: [] as string[],
	resident: [],
	currentPage: 1,
	totalPages: 1,
	filters: {
		name: '', // Initialize with an empty string for default filtering
		type: '',
		dimension: '',
	},

	async fetchLocations(page = 1) {
		try {
			const { name, type, dimension } = this.filters;
			const query = `page=${page}&name=${name}&type=${type}&dimension=${dimension}`;
			const response = await fetch(`https://rickandmortyapi.com/api/location?${query}`);
			const data = await response.json();

			// Concatenate the new locations to the existing array
			this.locations = [...this.locations, ...data.results];
			this.totalPages = data.info.pages;
		} catch (error) {
			console.error('Error fetching locations:', error);
		}
	},

	async getLocationDetails(id) {
		try {
			const response = await fetch(`https://rickandmortyapi.com/api/location/${id}`);
			const data = await response.json();

			this.locationDetails = data;
		} catch (error) {
			console.log(error);
		}
	},

	async fetchAndSetResidentsDetails(idList: string[]) {
		try {
			const response = await fetch(`https://rickandmortyapi.com/api/character/${idList}`);
			const data = await response.json();

			if (typeof data === 'object') {
				this.resident = [data];
				this.residents = [data];
			}
			if (data?.results) {
				this.residents = data.results;
			} else {
				this.residents = data;
			}
		} catch (error) {
			console.error('Error fetching character details:', error);
			throw error;
		}
	},

	applyFilters() {
		// Reset current page before applying filters
		this.currentPage = 1;
		this.locations = []; // Clear existing data
		this.fetchLocations();
	},

	prevPage() {
		if (this.currentPage > 1) {
			this.fetchLocations(this.currentPage - 1);
		}
	},

	nextPage() {
		if (this.currentPage < this.totalPages) {
			this.fetchLocations(this.currentPage + 1);
		}
	},

	get allLocations() {
		return this.locations;
	},
}));
