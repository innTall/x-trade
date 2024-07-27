<script setup>
</script>

<template>
	<div class="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
		<div class="flex items-center justify-center">
			<div class="w-72 bg-gray-800 rounded-lg shadow-lg p-5">
				<div class="pb-2">
					<slot name="header">
						Watchlist
					</slot>
				</div>
				<div class="pb-2">
					<slot name="body">
						Default Body
					</slot>
				</div>
				<div class="text-right pb-2">
					<slot name="footer">
						<button @click="$emit('close')" class="px-2 mr-2 text-red-700 border-2 border-red-700">
							Close
						</button>
						<button @click="$emit('create')" class="px-2 text-blue-700 border-2 border-blue-700">
							Create
						</button>
					</slot>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>