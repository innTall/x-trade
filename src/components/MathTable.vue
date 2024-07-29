<script setup>
import { useTableStore } from '@/stores/mTable.js';

const {
	gridOrdersKeys: nums,
	buyLimitLevels: levels,
	buyOrdersArray: buy,
	sumBuyOrders: total,
	amountBuyOrders: amounts,
	sumAmountOrders: summa,
	buyZeroLevels: zero,
	sellLevelsArray: sell,
	totalProfit: profit
} = useTableStore();

const headers = [
	{ title: 'N', class: '' },
	{ title: 'Level', class: 'text-green-400' },
	{ title: 'Amt', class: '' },
	{ title: 'Sum', class: 'font-bold' },
	{ title: 'Zero', class: 'text-blue-400' },
	{ title: 'Sell', class: 'text-red-400' },
	{ title: 'Buy', class: '' },
	{ title: 'total', class: 'font-bold' },
	{ title: 'TP', class: 'bg-green-800' },
];

const data = [nums, levels, amounts, summa, zero, sell, buy, total, profit];
</script>

<template>
	<div class="flex justify-between text-xs text-center gap-2">
		<div v-for="(header, i) in headers" :key="i" :class="'container ' + header.class">
			<p class="font-bold underline">{{ header.title }}</p>
			<div v-for="(item, index) in data[i]" :key="index" class="">
				{{ item }}
			</div>
		</div>
	</div>
</template>
<style scoped></style>