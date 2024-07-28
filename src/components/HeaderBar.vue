<script setup>
import LogoItem from './layouts/LogoItem.vue';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import AssetSelect from './AssetSelect.vue';
import { useAssetStore } from '@/stores/assets.js';
import { useTickerStore } from '@/stores/tickers.js';
const { selectedAsset } = storeToRefs(useAssetStore());
const { updateAsset } = useAssetStore();
const { getSymbols } = useTickerStore();
function handleAssetChange(newAsset) {
	updateAsset(newAsset);
	getSymbols(newAsset);
}
onMounted(() => {
	getSymbols(selectedAsset.value);
});
</script>

<template>
	<div
		class="fixed h-14 flex gap-5 p-2 items-center top-0 left-0 right-0 border-b border-green-600 bg-gray-900 shadow z-10">
		<div>
			<LogoItem />
		</div>
		<div>
			<RouterLink :to="{ name: 'Watchlist' }"> Watch |</RouterLink>
		</div>
		<div class="">
			<AssetSelect @assetChanged="handleAssetChange" />
		</div>
	</div>
</template>