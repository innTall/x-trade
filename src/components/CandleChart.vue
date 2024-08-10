<script setup>
import { ref, onMounted } from 'vue';
import Highcharts from 'highcharts/highstock';
//import data from "../data/klines.json";
import HighchartsAccessibility from 'highcharts/modules/accessibility';
HighchartsAccessibility(Highcharts);

const container = ref(null);
const ohlc = ref([]);
const volume = ref([]);
let data;
const initChart = async() => {
	const uri = "https://api.binance.com/api/v3/uiKlines?interval=1d&symbol=ADAUSDT"; // for candlestick chart
	const response = await fetch(uri);
	data = await response.json();
	data.forEach(candle => {
		ohlc.value.push([
			candle[0], // date
			+candle[1], // open
			+candle[2], // high
			+candle[3], // low
			+candle[4]  // close
		]);
		volume.value.push({
			x: candle[0],
			y: +candle[5], // volume
		});
	});
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
		xAxis: {
			gridLineColor: '#383838',
			gridLineWidth: 0.5,
			labels: {
				style: {
					fontSize: 10,
					color: '#ffffff'
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
			}
		}
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
		xAxis: {
			crosshair: {
				label: {
					enabled: true
				}
			}
		},
		yAxis: [
			{
				crosshair: {
					label: {
						enabled: true
					}
				}
			},
			{
				gridLineWidth: false,
				top: '70%',
				height: '30%',
				offset: 0,
				//opposite: false,
			}
		],
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