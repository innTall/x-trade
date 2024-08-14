<script setup>
import LogoItem from './layouts/LogoItem.vue';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import AssetSelect from './AssetSelect.vue';
import IntervalSelect from './IntervalSelect.vue';
import { useAssetStore } from '@/stores/assets.js';
import { useTickerStore } from '@/stores/tickers.js';
import { useIntervalStore } from '@/stores/intervals.js';
const { selectedAsset } = storeToRefs(useAssetStore());
const { selectedInterval } = storeToRefs(useIntervalStore());
const { updateAsset } = useAssetStore();
const { getSymbols } = useTickerStore();
const { updateInterval } = useIntervalStore();
function handleAssetChange(newAsset) {
	updateAsset(newAsset);
	getSymbols(newAsset);
}
function handleIntervalChange(newInterval) {
	updateInterval(newInterval);
	//getSymbols(newInterval);
}
onMounted(() => {
	getSymbols(selectedAsset.value);
});
</script>

<template>
	<div
		class="fixed h-14 flex justify-between gap-5 p-2 items-center top-0 left-0 right-0 border-b border-green-600 bg-gray-900 shadow z-10">
		<div>
			<LogoItem />
		</div>
		<div>
			<RouterLink :to="{ name: 'Watchlist' }"> W |</RouterLink>
			<RouterLink :to="{ name: 'Chartpage' }"> Ch |</RouterLink>
			<RouterLink :to="{ name: 'Mathpage' }"> M |</RouterLink>
		</div>
		<div class="flex gap-3">
			<div class="">
				<AssetSelect @assetChanged="handleAssetChange" />
			</div>
			<div class="">
				<IntervalSelect @intervalChanged="handleIntervalChange" />
			</div>
		</div>
	</div>
</template>