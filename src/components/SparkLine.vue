<script setup>
import { ref, onMounted, watch } from 'vue';
import Highcharts from 'highcharts';
import HighchartsVue from 'highcharts-vue';
import HighchartsAccessibility from 'highcharts/modules/accessibility.js';
HighchartsAccessibility(Highcharts);

const props = defineProps({
	data: {
		type: Array,
		required: true,
	},
	color: {
		type: String,
		default: '#7cb5ec',
	}
});
const chartContainer = ref(null);
const renderChart = () => {
	if (chartContainer.value) {
		Highcharts.chart(chartContainer.value, {
			chart: {
				type: 'line',
				backgroundColor: null,
				borderWidth: 0,
				margin: [0, 0, 0, 0],
				height: 50,
				style: {
					overflow: 'visible',
				},
				skipClone: true,
			},
			title: {
				text: null,
			},
			credits: {
				enabled: false,
			},
			xAxis: {
				visible: false,
			},
			yAxis: {
				visible: false,
			},
			tooltip: {
				enabled: false,
			},
			legend: {
				enabled: false,
			},
			exporting: {
				enabled: false,
			},
			plotOptions: {
				series: {
					animation: false,
					lineWidth: 1,
					shadow: false,
					states: {
						hover: {
							enabled: false,
						},
					},
					marker: {
						enabled: false,
					},
				},
			},
			series: [
				{
					data: props.data,
					color: props.color,
				},
			],
			accessibility: {
				enabled: true
			}
		});
	}
};
onMounted(() => {
	renderChart();
});
watch(() => props.data, renderChart);
</script>

<template>
	<div>
		<div ref="chartContainer" style="width: 100%; height: 50px;"></div>
	</div>
</template>
<style scoped></style>