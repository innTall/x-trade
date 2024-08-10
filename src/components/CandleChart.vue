<script setup>
import { ref, onMounted, watch } from 'vue';
import Highcharts from 'highcharts/highstock';
//import data from "../data/klines.json";
import { storeToRefs } from "pinia";
import { useChartStore } from '../stores/chart.js';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
HighchartsAccessibility(Highcharts);

const { data, ohlc, volume, chartScale, } = storeToRefs(useChartStore());
const { getData } = useChartStore();
const container = ref(null);
//const chart = ref([]);
let chart;
const initChart = (data) => {
	Highcharts.setOptions({
		chart: {
			backgroundColor: '#111827',
			panning: true,  // Enable panning
			panKey: 'shift' // Pan with shift key
		},
		plotOptions: {
			series: {
				dataGrouping: {
					enabled: false,
				},
				turboThreshold: 0,
			},
			candlestick: {
				color: '#ff0000',
				upColor: '#008000',
				upLineColor: '#008000',
				lineColor: '#ff0000',
				dataGrouping: {
					enabled: false,
				},
			},
			ohlc: {
				dataGrouping: {
					enabled: false,
				},
			},
		},
		xAxis: {
			gridLineColor: '#383838',
			gridLineWidth: 0.5,
			labels: {
				style: {
					fontSize: 10,
					color: '#ffffff'
				}
			},
			crosshair: {
				color: '#676767',
				label: {
					enabled: true,
					fontSize: 10,
					backgroundColor: '#111827',
					borderWidth: 1,
					borderColor: '#ffffff',
				}
			}
		},
		yAxis: {
			gridLineColor: '#383838',
			gridLineWidth: 0.5,
			labels: {
				style: {
					fontSize: 10,
					color: '#ffffff'
				}
			},
			crosshair: {
				snap: false,
				label: {
					enabled: true,
					fontSize: 10,
					backgroundColor: '#111827',
					borderWidth: 1,
					borderColor: '#ffffff',
					format: '{value:.2f}',
				}
			}
		}
	});
	chart = Highcharts.stockChart(container.value, {
		chart: {
			events: {
				selection(event) {
					if (event.resetSelection) {
						return true;
					}
					const { min, max } = event.xAxis[0];
					chart.xAxis[0].setExtremes(min, max);
					return false;
				}
			}
		},
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
		xAxis: {
			crosshair: {
				label: {
					enabled: true
				},
				color: '#676767',
				snap: true,
			}
		},
		yAxis: [
			{
				crosshair: {
					label: {
						enabled: true
					},
					color: '#676767',
				}
			},
			{
				gridLineWidth: false,
				top: '70%',
				height: '30%',
				offset: 0,
				//opposite: false,
				crosshair: false,
			}
		],
		tooltip: {
			enabled: true,
			useHTML: true,
			formatter: function () {
				const point = this.points[0].point;
				return `
				  <div style="position: absolute; left: 5px; top: 5px; font-size: 12px; backgroundColor: #111827; color: white">
				 		<span>H - ${point.high}</span><br/>
				  	<span>L - ${point.low}</span>
				  </div>
			  `;
			},
			positioner: function () {
				return { x: 0, y: 0 };
			},
			shadow: false,
			borderWidth: 0,
			backgroundColor: 'transparent',
		},
		series: [
			{
				type: 'candlestick',
				id: 'bnb',
				name: 'BNB',
				data: ohlc.value,
				yAxis: 0,
			},
			{
				type: 'column',
				name: 'Volume',
				data: volume.value,
				yAxis: 1,
			},
		],
		xAxis: {
			endOnTick: true, // Ensure it does not end on tick
			maxPadding: 0.05, // Add padding to the end of x-axis
			events: {
				afterSetExtremes: (e) => {
					chartScale.value.start = e.min;
					chartScale.value.end = e.max;
				}
			},
		},
		accessibility: {
			enabled: true
		}
	});
	if (chartScale.value.start !== null && chartScale.value.end !== null) {
		chart.xAxis[0].setExtremes(chartScale.value.start, chartScale.value.end);
	}
};
onMounted(() => {
	if (ohlc.value.length === 0) {
		initChart(data);
	} else {
		initChart([]);
	}
});
watch(ohlc, (newVal) => {
	if (chart) {
		const ohlcSeries = chart.get('ohlc');
		if (ohlcSeries) {
			ohlcSeries.setData(newVal);
		}
	}
}, { deep: true });

watch(volume, (newVal) => {
	if (chart) {
		const volumeSeries = chart.get('Volume');
		if (volumeSeries) {
			volumeSeries.setData(newVal);
		}
	}
}, { deep: true });
</script>

<template>
	<div id="container" ref="container" class="w-full"></div>
</template>
<style scoped>
#container {
	height: 360px;
}
</style>