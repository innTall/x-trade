<script setup>
import { onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useIntervalStore } from "@/stores/intervals.js";
const { intervals, selectedInterval } = storeToRefs(useIntervalStore());
const { updateInterval } = useIntervalStore();
watch(selectedInterval, (newInterval) => {
	updateInterval(newInterval);
});
onMounted(() => {
	updateInterval(selectedInterval);
});
</script>

<template>
	<div>
		<label for="sel" class="block text-sm font-medium"></label>
		<select id="sel" v-model="selectedInterval"
			class="mt-1 block w-16 pl-1 pr-2 py-1 text-xs border border-green-600 bg-gray-800 sm:text-sm rounded-md">
			<option v-for="interval in intervals" :key="interval" :value="interval">
				{{ interval }}
			</option>
		</select>
	</div>
</template>