<template>
	<div class="loader" v-if="loading">
		<span class="loader-wrapper"></span>
	</div>
</template>

<script lang="ts" setup>
// Define props
const props = defineProps({
	loading: Boolean,
});
</script>

<style lang="css">
.loader {
	position: relative;
	width: 100%;
	height: 500px;
}

.loader-wrapper {
	position: absolute;
	width: 64px;
	height: 64px;
	background: #fff;
	border-radius: 50%;
	overflow: hidden;
	top: 50%;
	left: 50%;
}

.loader-wrapper:after {
	content: '';
	position: absolute;
	inset: 8px;
	margin: auto;
	background: #222b32;
	border-radius: 50%;
}

.loader-wrapper:before {
	content: '';
	position: absolute;
	inset: 0px;
	margin: auto;
	background: #97ce4c;
	animation: crlMugLoader 2s linear infinite alternate;
}

@keyframes crlMugLoader {
	0%,
	10% {
		transform: translateY(64px);
	}

	90%,
	100% {
		transform: translateY(0px);
	}
}
</style>
