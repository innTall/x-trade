<script setup>
import DOMPurify from 'dompurify';
import { ref, computed } from 'vue';
import { storeToRefs } from "pinia";
import { useTickerStore } from '../stores/tickers.js';
const { tickers } = storeToRefs(useTickerStore());
const searchTicker = ref('');
const selectedTicker = ref('');
const searchTickers = computed(() => {
	if (searchTicker.value === "") return [];
	const searchPattern = new RegExp(`^${searchTicker.value}`, "i");
	let matches = 0;
	return tickers.value.filter((ticker) => {
		if (searchPattern.test(ticker.symbol) && matches < 25) {
			matches++;
			return ticker;
		}
	});
});
const highlightMatch = (tickerSymbol) => {
	const regex = new RegExp(`(^${searchTicker.value})`, "i");
	const highlighted = tickerSymbol.replace(
		regex, `<span id="highlight" class="text-red-600">$1</span>`
	);
	return DOMPurify.sanitize(highlighted);
};
const selectTicker = (ticker) => {
	selectedTicker.value = ticker;
	searchTicker.value = '';
};
</script>

<template>
	<div class="ml-2">
		<label for="search">Tickers</label>
		<div>
			<input v-model="searchTicker" type="text" id="search" placeholder="Type here...">
		</div>
		<div>
			<ul v-if="searchTickers.length">
				<li> Showing {{ searchTickers.length }} of {{ tickers.length }} results</li>
				<li v-for="ticker in searchTickers" :key="ticker.symbol" @click="selectTicker(ticker.symbol)"
					v-html="highlightMatch(ticker.symbol)">
				</li>
			</ul>
			<p v-if="selectedTicker"> You have selected: {{ selectedTicker }} </p>
		</div>
	</div>
</template>
<style scoped></style>