<script setup>
</script>

<template>
	<div class="flex gap-2">
		<RouterLink :to="{ name: 'Watchlist' }">
			<img src="/logo.png" alt="Logo" class="h-10 w-10" />
		</RouterLink>
		<div class="">
			<p class="text-sm text-right">
				<strong>
					<span>GridTrade</span>
				</strong>
				<br>
				<small>Trade is easy!</small>
			</p>
		</div>
	</div>
</template>
<style scoped></style>