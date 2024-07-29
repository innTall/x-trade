<script setup>
import { storeToRefs } from "pinia";
import { useMinmaxStore } from "@/stores/mMinmax.js";
const { minPrice, maxPrice, gridSize, priceAlert } = storeToRefs(useMinmaxStore());
const { getProfit } = useMinmaxStore();
</script>

<template>
	<div class="w-full">
		<div class="flex px-2 text-center flex-row text-sm justify-around gap-5">
			<div class="">
				<label name="min" class="">Min:<br>
					<input id="min" type="number" name="min" v-model="minPrice" step="0.001" required
						:class="['w-20 text-center border rounded-md', { 'bg-red-500': priceAlert, 'bg-green-800': !priceAlert }]"
						@input="getProfit" />
				</label>
			</div>
			<div class="">
				<label name="max" class="">Max:<br>
					<input id="max" type="number" name="max" v-model="maxPrice" step="0.001" required
						class="w-20 bg-green-800 text-center border rounded-md"
						@input="getProfit" />
				</label>
			</div>
			<div class="">
				<p class="">TP,%:<br>
				<div :="getProfit()" type="number" class="font-bold">{{ gridSize }}</div>
				</p>
			</div>
		</div>
	</div>
</template>
<style scoped></style>