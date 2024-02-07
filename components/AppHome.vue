<!-- pages/index.vue -->

<template>
	<div class="homepage">
		<h1>Welcome to the Rick and Morty API Explorer!</h1>
		<p>Explore the characters, locations, and episodes from the Rick and Morty universe using the navigation links.</p>

		<div class="card-container">
			<!-- Characters Card -->
			<router-link to="/characters" class="card">
				<h2>Characters</h2>
				<p>Explore Rick and Morty characters</p>
			</router-link>

			<!-- Locations Card -->
			<router-link to="/locations" class="card">
				<h2>Locations</h2>
				<p>Discover various locations in the Rick and Morty universe</p>
			</router-link>

			<!-- Episodes Card -->
			<router-link to="/episodes" class="card">
				<h2>Episodes</h2>
				<p>Check out different episodes of Rick and Morty</p>
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	// Component logic here
};
</script>

<style scoped>
.homepage {
	max-width: 800px;
	margin: 0 auto;
	padding: 20px;
}

.card-container {
	display: flex;
	justify-content: space-around;
	margin-top: 20px;
}

.card {
	width: 200px;
	padding: 20px;
	border: 1px solid #ccc;
	border-radius: 8px;
	cursor: pointer;
	transition:
		transform 0.3s ease-in-out,
		box-shadow 0.3s ease-in-out;
}

.card:hover {
	transform: scale(1.05);
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
