<template>
	<div class="card-wrapper">
		<div v-for="item in items" :key="item?.id" class="card" @click="navigateToDetail(item.id)">
			<div v-if="type === 'characters'">
				<NuxtLink :to="`/characters/${item.id}`">
					<img :src="item?.image" alt="Card Image" />
					<h3>{{ item?.name }}</h3>
					<span class="status"
						><span class="status__icon" :class="item.status"></span> {{ item.status }} - {{ item.species }}</span
					>
					<h3>
						Last known location: <br />
						<span class="status">{{ item?.location?.name }}</span>
					</h3>
				</NuxtLink>
			</div>
			<div v-if="type === 'episodes'">
				<h3>{{ item?.name }}</h3>
				<p>{{ item?.air_date }}</p>
				<p>{{ item?.episode }}</p>
			</div>
			<div v-if="type === 'locations'">
				<NuxtLink :to="`/locations/${item.id}`">
					<h3 class="location-name">{{ item?.name }}</h3>
					<h3 class="location-type">{{ item?.type }}</h3>
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

// eslint-disable-next-line vue/require-prop-types
const props = defineProps(['items', 'type']);

const getItems = ref([]);

const router = useRouter();

const navigateToDetail = (id: string) => {
	if (props.type === 'episodes') {
		router.push(`/episodes/${id}`);
	}
};

const episodes = ref([]);

onMounted(() => {
	getItems.value = props.items;

	if (props.type === 'episodes') {
		episodes.value = props.items;
	}
});
</script>

<style scoped></style>
