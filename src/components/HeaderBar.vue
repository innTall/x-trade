<script setup>
import LogoItem from './layouts/LogoItem.vue';
</script>
<template>
	<div
		class="fixed h-14 flex gap-5 p-2 items-center top-0 left-0 right-0 border-b border-green-600 bg-gray-900 shadow z-10">
		<div>
			<LogoItem />
		</div>
		<div>
			<RouterLink :to="{ name: 'Watchlist' }"> Watch |</RouterLink>
			<RouterLink :to="{ name: 'WatchTemplate' }"> Template |</RouterLink>
		</div>
		<div class="">
		</div>
	</div>
</template>