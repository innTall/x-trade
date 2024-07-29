<script setup>
import { storeToRefs } from 'pinia';
import { useSearchStore } from '@/stores/searches.js';
import { useTickerStore } from "@/stores/tickers.js";
import { useSelectStore } from '@/stores/selects.js';
import { useArrayStore } from '@/stores/arrays.js';
const { tickers } = storeToRefs(useTickerStore());
const { searchTicker, searchTickers } = storeToRefs(useSearchStore());
const { highlightMatch } = useSearchStore();
const { selectTicker, deleteTicker, MAX_TICKERS } = useSelectStore();
const { selectedTickers, errorMessage } = storeToRefs(useSelectStore());
const { selectedArray } = storeToRefs(useArrayStore());
</script>

<template>
	<div class="ml-2">
		<div v-if="errorMessage" class="text-red-600">
			{{ errorMessage }}
		</div>
		<p>Selected: {{ selectedArray?.items.length }} / {{ MAX_TICKERS }}</p>
		<div>
			<input v-model="searchTicker" type="text" id="search" placeholder="Type here..." class="bg-gray-800">
		</div>
		<div>
			<ul v-if="searchTickers.length">
				<li> Showing {{ searchTickers.length }} of {{ tickers.length }} results</li>
				<li v-for="ticker in searchTickers" :key="ticker.symbol" @click="selectTicker(ticker)"
					v-html="highlightMatch(ticker.symbol)">
				</li>
			</ul>
			<div v-if="selectedArray?.items.length">
				<p>Selected:</p>
				<ul>
					<li v-for="ticker in selectedTickers" :key="ticker.symbol">
						{{ ticker.symbol }} - {{ ticker.lastPrice * 1 }} - {{ ticker.quoteVolume }}
						<button @click="deleteTicker(ticker)" class="ml-2 text-red-600 font-bold">
							X
						</button>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<style scoped></style>