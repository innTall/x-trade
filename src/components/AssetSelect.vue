<script setup>
import { onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useAssetStore } from "@/stores/assets.js";
const { assets, selectedAsset } = storeToRefs(useAssetStore());
const { updateAsset } = useAssetStore();
watch(selectedAsset, (newAsset) => {
	updateAsset(newAsset);
});
onMounted(() => {
	updateAsset(selectedAsset);
});
</script>

<template>
	<div>
		<label for="sel" class="block text-sm font-medium"></label>
		<select id="sel" v-model="selectedAsset"
			class="mt-1 block w-16 pl-1 pr-2 py-1 text-xs border border-green-600 bg-gray-800 sm:text-sm rounded-md">
			<option v-for="asset in assets" :key="asset" :value="asset">
				{{ asset }}
			</option>
		</select>
	</div>
</template>