<script setup>
import MathNavbar from '../components/MathNavbar.vue';
import MathPanel from '../components/MathPanel.vue';
</script>

<template>
	<div>
		<MathNavbar />
		<div>
			<div class="border-b">
				<p>Chart</p>
			</div>
			<div class="p-2 border-b border-green-600">
				<MathPanel />
			</div>
			<div class="border-b">
				<p>Table</p>
			</div>
		</div>
		<RouterView />
	</div>
</template>
<style scoped></style>