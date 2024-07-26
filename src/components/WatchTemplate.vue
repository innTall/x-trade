<script setup>
import { storeToRefs } from 'pinia';
import { useSearchStore } from '@/stores/searches.js';
import { useTickerStore } from "@/stores/tickers.js";
import { useSelectStore } from '@/stores/selects.js';
const { searchTicker, searchTickers } = storeToRefs(useSearchStore());
const { selectedTicker } = storeToRefs(useSelectStore());
const { tickers } = storeToRefs(useTickerStore());
const { highlightMatch } = useSearchStore();
const { selectTicker } = useSelectStore();
</script>

<template>
	<div class="ml-2">
		<label for="search">Tickers</label>
		<div>
			<input v-model="searchTicker" type="text" id="search" placeholder="Type here..." class="bg-gray-800">
		</div>
		<div>
			<ul v-if="searchTickers.length">
				<li> Showing {{ searchTickers.length }} of {{ tickers.length }} results</li>
				<li v-for="ticker in searchTickers" :key="ticker.symbol" @click="selectTicker(ticker.symbol)"
					v-html="highlightMatch(ticker.symbol)">
				</li>
			</ul>
			<p v-if="selectedTicker"> Selected:
				{{ selectedTicker.symbol }} - {{ selectedTicker.lastPrice *1 }} - {{ selectedTicker.quoteVolume }} </p>
		</div>
	</div>
</template>
<style scoped></style>