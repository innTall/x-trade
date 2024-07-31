<script setup>
import { storeToRefs } from 'pinia';
import TickerItem from '@/components/TickerItem.vue';
import { useSearchStore } from '@/stores/searches.js';
import { useTickerStore } from "@/stores/tickers.js";
import { useSelectStore } from '@/stores/selects.js';
import { useArrayStore } from '@/stores/arrays.js';
const { tickers } = storeToRefs(useTickerStore());
const { searchTicker, searchTickers } = storeToRefs(useSearchStore());
const { highlightMatch } = useSearchStore();
const { selectTicker, deleteTicker, MAX_TICKERS, isSelected } = useSelectStore();
const { errorMessage } = storeToRefs(useSelectStore());
const { selectedArray } = storeToRefs(useArrayStore());
</script>

<template>
	<div class="ml-2 mr-2">
		<div class="flex gap-2">
			<input v-model="searchTicker" type="text" id="search" placeholder="Type here..." class="w-1/3 bg-gray-800">
			<p class="w-1/3 ">Selected: {{ selectedArray?.items.length }} / {{ MAX_TICKERS }}</p>
			<div v-if="errorMessage" class="w-1/3 text-center px-2 border border-red-600 text-red-600 rounded-lg">
				{{ errorMessage }}
			</div>
		</div>
		<div>
			<div v-if="searchTickers.length" class="relative">
				<ul class="absolute bg-gray-800 shadow-lg rounded-lg z-10 w-1/3 border">
					<!--li> Showing {{ searchTickers.length }} of {{ tickers.length }} results</li-->
					<li v-for="ticker in searchTickers" :key="ticker.symbol" @click="selectTicker(ticker)"
						v-html="highlightMatch(ticker.symbol)" :class="{ 'text-gray-500': isSelected(ticker) }">
					</li>
				</ul>
			</div>
			<div v-if="selectedArray?.items.length">
				<p class="font-bold underline">{{ selectedArray.name }}</p>
				<div class="grid grid-cols-2 gap-2">
					<TickerItem v-for="ticker in selectedArray.items" :key="ticker.symbol" :ticker="ticker" />
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped></style>