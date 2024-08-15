<script setup>
import { ref, onMounted, watch } from 'vue';
import Highcharts from 'highcharts/highstock';
import indicatorsInit from 'highcharts/indicators/indicators';
import ao from 'highcharts/indicators/ao.js';
import rsi from 'highcharts/indicators/rsi.js';
//import data from "../data/klines.json";
import { storeToRefs } from "pinia";
import { useChartStore } from '../stores/chart.js';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
HighchartsAccessibility(Highcharts);

const { ohlc, volume, chartScale } = storeToRefs(useChartStore());
const { data } = useChartStore();
const container = ref(null);
indicatorsInit(Highcharts);
ao(Highcharts); // Initialize the AO indicator
rsi(Highcharts);

const initChart = (data) => {
	const updateHighLowLabels = (chart) => {
		const visiblePoints = chart.series[0].points.filter(point => point.isInside);
		if (visiblePoints.length === 0) return;
		let highestPoint = visiblePoints[0];
		let lowestPoint = visiblePoints[0];
		visiblePoints.forEach(point => {
			if (point.high > highestPoint.high) highestPoint = point;
			if (point.low < lowestPoint.low) lowestPoint = point;
		});
		// Remove existing labels
		chart.highLabel && chart.highLabel.destroy();
		chart.lowLabel && chart.lowLabel.destroy();
		// Add label for the highest point
		chart.highLabel = chart.renderer.text(
			`${highestPoint.high}_`,
			chart.plotLeft + chart.xAxis[0].toPixels(highestPoint.x) - 50,
			chart.plotTop + chart.yAxis[0].toPixels(highestPoint.high) - 15
		)
			.css({
				color: '#FFffff', // Red for high
				fontSize: '10px'
			})
			.add();
		// Add label for the lowest point
		chart.lowLabel = chart.renderer.text(
			`${lowestPoint.low}_`,
			chart.plotLeft + chart.xAxis[0].toPixels(lowestPoint.x) - 55,
			chart.plotTop + chart.yAxis[0].toPixels(lowestPoint.low) - 10
		)
			.css({
				color: '#ffffFF', // Blue for low
				fontSize: '10px'
			})
			.add();
	};
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
	const chart = Highcharts.stockChart(container.value, {
		chart: {
			events:
			{
				selection(event) {
					if (event.resetSelection) {
						return true;
					}
					const { min, max } = event.xAxis[0];
					chart.xAxis[0].setExtremes(min, max);
					return false;
				},
				load() {
					updateHighLowLabels(this);
				},
				redraw() {
					updateHighLowLabels(this);
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
				height: '80%',
				crosshair: {
					label: {
						enabled: true
					},
					color: '#676767',
				}
			},
			{
				gridLineWidth: false,
				top: '60%',
				height: '20%',
				offset: 0,
				opposite: false,
				crosshair: false,
				labels: {
					enabled: false
				},
			},
			{
				top: '80%',
				height: '20%',
				offset: 0,
				labels: {
					enabled: false
				},
			},
			{
				top: '80%',
				height: '20%',
				offset: 0,
				//opposite: false,
				labels: {
					enabled: false
				},
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
				color: '#676767',
				opacity: 0.6,
				label: {
					enable: false
				}
			},
			{
				type: 'ao',
				yAxis: 2,
				greaterBarColor: '#3CB371',
				lowerBarColor: '#FF6347',
				linkedTo: 'bnb',
				showInLegend: true,
				crisp: false,
				dataGrouping: {
					enabled: false
				}
			},
			{
				type: 'rsi',
				yAxis: 3,
				linkedTo: 'bnb',
				lineWidth: 1,
				lineColor: '#00BFFF',
				showInLegend: false,
				marker: false, // ok
				dataGrouping: {
					enabled: false
				}
			}
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
watch(ohlc.value, (newVal) => {
	if (chart) {
		const ohlcSeries = chart.get('ohlc');
		if (ohlcSeries) {
			ohlcSeries.setData(newVal);
		}
	}
}, { deep: true });

watch(volume.value, (newVal) => {
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