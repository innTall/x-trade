<script setup>
import { ref, onMounted } from 'vue';
import Highcharts from 'highcharts/highstock';
import data from "../data/ohlc.json";
import HighchartsAccessibility from 'highcharts/modules/accessibility';
HighchartsAccessibility(Highcharts);
const container = ref(null);
const initChart = (data) => {
	Highcharts.setOptions({
		chart: {
			backgroundColor: '#111827'
		},
		plotOptions: {
			candlestick: {
				color: '#ff0000',
				upColor: '#008000',
				upLineColor: '#008000',
				lineColor: '#ff0000'
			}
		},
	});
	Highcharts.stockChart(container.value, {
		scrollbar: {
			enabled: false
		},
		rangeSelector: {
			enabled: false
		},
		navigator: {
			enabled: false
		},
		tooltip: {
			enabled: false
		},
		series: [
			{
				name: "BNB",
				type: "candlestick",
				data: data,
			},
		],
		xAxis: {
			endOnTick: true, // Ensure it does not end on tick
			maxPadding: 0.02, // Add padding to the end of x-axis
		},
		accessibility: {
			enabled: true
		}
	});
};
onMounted(() => {
	initChart(data);
});
</script>

<template>
	<div id="container" ref="container" class="w-full"></div>
</template>
<style scoped>
#container {
	height: 360px;
}
</style>