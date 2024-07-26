<script setup>
import { ref } from 'vue';
import { storeToRefs } from "pinia";
import { useTickerStore } from '../stores/tickers.js';
const { tickers } = storeToRefs(useTickerStore());
const searchTicker = ref('');
</script>

<template>
	<div class="ml-2">
		<label for="search">Tickers</label>
		<div>
			<input v-model="searchTicker" type="text" id="search" placeholder="Type here...">
		</div>
	</div>
</template>
<style scoped></style>