<script setup>
import MathNavbar from '../components/MathNavbar.vue';
import CandleChart from '../components/CandleChart.vue';
import MathPanel from '../components/MathPanel.vue';
import MathTable from '../components/MathTable.vue';
</script>

<template>
	<div>
		<MathNavbar />
		<div>
			<div class="border-b">
				<CandleChart />
			</div>
			<div class="p-2 border-b border-green-600">
				<MathPanel />
			</div>
			<div class="border-b">
				<MathTable />
			</div>
		</div>
		<RouterView />
	</div>
</template>
<style scoped></style>