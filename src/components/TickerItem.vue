<script setup>
const props = defineProps({
	ticker: {
		type: Object,
		required: true,
	}
});
</script>

<template>
	<article class="h-24 flex border">
		<div id="color" class="w-1 bg-green-600"></div>
		<div class="container flex justify-between">
			<div class="pl-2 grid grid-cols-1 content-between">
				<div class="items-start grid gap-2">
					<p class="text-xs">Binance</p>
					<p class="text-sm">{{ ticker.symbol }}</p>
				</div>
				<div class="grid gap-1">
					<p class="text-xs">Asset</p>
					<p class="text-sm">Free Depo</p>
				</div>
			</div>
			<div class="w-1/2 grid grid-cols-1 content-between">
				<div class="h-12 border text-center text-xs bg-gray-800">Sparkline</div>
				<div class="grid gap-1 text-right pr-2">
					<p class="text-sm">{{ ticker.lastPrice * 1 }}</p>
					<p class="text-xs">{{ ticker.quoteVolume }} $</p>
				</div>
			</div>
		</div>
	</article>
</template>
<style scoped></style>