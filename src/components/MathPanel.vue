<script setup>
import MathPanelSettings from './MathPanelSettings.vue';
import MathPanelMinmax from './MathPanelMinmax.vue';
import MathPanelConfirm from './MathPanelConfirm.vue';
</script>

<template>
	<div class="container w-full flex justify-between items-center">
		<div>
			<MathPanelSettings />
		</div>
		<div>
			<MathPanelMinmax />
		</div>
		<div>
			<MathPanelConfirm />
		</div>
	</div>
</template>
<style scoped></style>