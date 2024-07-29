<script setup>
import { watch } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useArrayStore } from '@/stores/arrays.js';
const { arrays, selectedArray } = storeToRefs(useArrayStore());
const { selectArray } = useArrayStore();
const route = useRoute();
const props = defineProps({
	onAdd: {
		type: Function,
		required: true,
	},
});

watch(route, (newRoute) => {
	selectArray(newRoute.params.arrayName);
});
</script>

<template>
	<div class="fixed top-14 h-10 left-0 right-0 bg-gray-900 shadow z-10 border-b border-green-600">
		<nav class="container p-1 flex justify-between center text-sm">
			<div class="flex items-center ml-2">
				<ul class="flex flex-start ml-2 gap-5">
					<li v-for="(array, index) in arrays" :key="index">
						<RouterLink :to="{ name: 'WatchTemplate', params: { arrayName: array.name } }" class="hover:bg-gray-700"
							:class="{ 'font-bold underline': selectedArray.value === array.name }" @click="selectArray(array.name)">
							{{ array.name }}
						</RouterLink>
					</li>
				</ul>
			</div>
			<div class="flex justify-end mr-5 items-center">
				<button @click="props.onAdd" class="p-1 rounded-md border border-green-600">
					Add
				</button>
			</div>
		</nav>
	</div>
</template>

<style scoped></style>