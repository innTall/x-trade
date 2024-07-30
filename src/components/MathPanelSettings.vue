<script setup>
import { ref } from 'vue';
import { storeToRefs } from "pinia";
import { useSettingsStore } from '@/stores/mSettings.js';
const {
	minFirstOrder, gridOrders, firstBuyLevel, orderRiseCoef, buyLevelsCoef, priceRound, amountRound
} = useSettingsStore();
const OpenSettings = ref(false);

const settings = [
	{ id: 'order', label: 'Min First Order', model: minFirstOrder, step: 0.1, unit: '$' },
	{ id: 'freq', label: 'Grid Orders', model: gridOrders, step: 0.05, unit: 'N' },
	{ id: 'buyl', label: 'First Buy Level', model: firstBuyLevel, step: 0.01, unit: '%' },
	{ id: 'rise', label: 'Order Rise Coef', model: orderRiseCoef, step: 0.05, unit: '%' },
	{ id: 'levc', label: 'Buy Levels Coef', model: buyLevelsCoef, step: 0.01, unit: '%' },
	{ id: 'proun', label: 'Price Round', model: priceRound, step: 1, unit: 'N' },
	{ id: 'aroun', label: 'Amount Round', model: amountRound, step: 1, unit: 'N' }
];
</script>

<template>
	<div class="container">
		<button @click="OpenSettings = true" class="text-sm p-2 rounded-lg border hover:bg-gray-700">
			Settings
		</button>
		<Teleport to="body">
			<div v-show="OpenSettings" class="fixed top-20 left-10 bg-gray-800 text-white z-10 border rounded-3xl p-4 w-1/2">
				<div class="text-right text-xs space-y-2">
					<template v-for="(setting, index) in settings" :key="index">
						<label :for="setting.id" class="flex justify-between">
							{{ setting.label }}:
							<div>
								<input :id="setting.id" type="number" v-model="setting.model" :step="setting.step" required
									class="w-16 bg-gray-900 font-bold text-right p-1 rounded" />
								{{ setting.unit }}
							</div>
						</label>
					</template>
				</div>
				<button @click="OpenSettings = false" class="mt-4 bg-gray-900 p-2 border rounded-md">
					Close
				</button>
			</div>
		</Teleport>
	</div>
</template>
<style scoped></style>