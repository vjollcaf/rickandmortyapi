<template>
	<header>
		<router-link to="/" class="logo">
			<img src="/logo-black.jpg" alt="Logo" />
		</router-link>
		<nav class="navigation">
			<!-- Your navigation links go here -->
			<router-link class="navigation__link" to="/characters">Characters</router-link>
			<router-link class="navigation__link" to="/locations">Locations</router-link>
			<router-link class="navigation__link" to="/episodes">Episodes</router-link>
		</nav>
	</header>
</template>
