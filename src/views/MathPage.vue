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
			<div class="border-b">
				<h3 class="font-bold underline">Math Settings Panel</h3>
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