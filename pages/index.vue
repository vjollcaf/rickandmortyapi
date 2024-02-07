<!-- pages/index.vue -->

<template>
	<div class="homepage">
		<!-- <img src="/banner-img.png" alt="banner-img" > -->

		<h1 class="homepage-title">Welcome to the Rick and Morty API Explorer!</h1>
		<p class="homepage-desc">
			Explore the characters, locations, and episodes from the Rick and Morty universe using the navigation links.
		</p>

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
export default {};
</script>

<style scoped>
.homepage {
	max-width: 800px;
	margin: 0 auto;
	padding: 20px;
	text-align: center;
}
.homepage-title {
	margin-top: 13rem;
}
h1,
.homepage-desc {
	text-align: center;
	max-width: 700px;
	margin: 0 auto;
	margin-bottom: 3rem;
}

.banner-img {
	max-width: 100%;
	margin-bottom: 20px;
}

h1,
p {
	font-size: 2.5rem;
	color: #2ecc71; /* Rick and Morty green */
}

p {
	font-size: 1.2rem;
	color: #bdc3c7; /* Light grey */
}

.card-container {
	display: flex;
	justify-content: center;
	margin-top: 20px;
}

.card {
	width: 200px;
	padding: 20px;
	border: 1px solid #2ecc71; /* Rick and Morty green */
	border-radius: 8px;
	cursor: pointer;
	transition:
		transform 0.3s ease-in-out,
		box-shadow 0.3s ease-in-out;
}

.card h2 {
	font-size: 1.5rem;
	color: #2ecc71; /* Rick and Morty green */
	margin-bottom: 10px;
}

.card p {
	font-size: 1rem;
	color: #bdc3c7; /* Light grey */
}

.card:hover {
	transform: scale(1.05);
	box-shadow: 0 0 10px rgba(46, 204, 113, 0.8); /* Slightly darker green */
}

@keyframes pulseAnimation {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.1);
	}
	100% {
		transform: scale(1);
	}
}

.card:hover {
	animation: pulseAnimation 1s infinite; /* Add a subtle pulse animation on hover */
}
</style>
