<script setup>
import { ref } from 'vue';
import { storeToRefs } from "pinia";
import { useSettingsStore } from '@/stores/mSettings.js';
const {
	minFirstOrder, gridOrders, firstBuyLevel, orderRiseCoef, buyLevelsCoef, priceRound, amountRound
} = storeToRefs(useSettingsStore());
const OpenSettings = ref(false);
</script>
<template>
	<div class="container">
		<button @click="OpenSettings = true" class="text-sm p-2 rounded-lg border hover:bg-gray-700">Settings</button>
		<Teleport to="body">
			<div v-show="OpenSettings"
				class="container fixed top-20 left-10 bg-gray-800 text-white z-10 border rounded-3xl p-2 w-1/2">
				<form @submit="submitForm">
					<div class="text-right text-xs">
						<label for="order">Min First Order:
							<input id="order" type="number" v-model="minFirstOrder" step="0.1" required
								class="w-1/4 bg-gray-900 font-bold text-right">$
						</label><br>
						<label for="freq">Grid Orders:
							<input id="freq" type="number" v-model="gridOrders" step="1" required
								class="w-1/4 bg-gray-900 font-bold text-right">%
						</label><br>
						<label for="buyl">First Buy Level:
							<input id="buyl" type="number" v-model="firstBuyLevel" step="0.01" required
								class="w-1/4 bg-gray-900 font-bold text-right">%
						</label><br>
						<label for="rise">Order Rise Coef:
							<input id="rise" type="number" v-model="orderRiseCoef" step="0.05" required
								class="w-1/4 bg-gray-900 font-bold text-right">%
						</label><br>
						<label for="levc">Buy Levels Coef:
							<input id="levc" type="number" v-model="buyLevelsCoef" step="0.01" required
								class="w-1/4 bg-gray-900 font-bold text-right">%
						</label><br>
						<label for="proun">Price Round:
							<input id="proun" type="number" v-model="priceRound" step="1" required
								class="w-1/4 bg-gray-900 font-bold text-right">N
						</label><br>
						<label for="aroun">Amount Round:
							<input id="aroun" type="number" v-model="amountRound" step="1" required
								class="w-1/4 bg-gray-900 font-bold text-right">N
						</label><br>
					</div>
					<div>
						<button @click="OpenSettings = false" class="bg-gray-900 p-1 border rounded-md">Close</button>
					</div>
				</form>
			</div>
		</Teleport>
	</div>
</template>
<style scoped></style>