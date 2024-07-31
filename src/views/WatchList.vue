<script setup>
import { ref } from 'vue';
import { storeToRefs } from "pinia";
import { useArrayStore } from '@/stores/arrays.js';
import WatchModal from '@/components/WatchModal.vue';
import WatchNavbar from '@/components/WatchNavbar.vue';
const { arrays, newArrayName, } = storeToRefs(useArrayStore());
const { createArray, deleteArray, selectArray, } = useArrayStore();
const showModal = ref(false);
const openModal = () => {
	showModal.value = true;
};
const closeModal = () => {
	showModal.value = false;
};
</script>

<template>
	<div class="">
		<WatchNavbar :onAdd="openModal" />
		<WatchModal v-if="showModal" @close="closeModal" @create="createArray">
			<template v-slot:body>
				<div>
					<label for="array-name" class="text-white">Enter new array name:</label>
					<input v-model="newArrayName" id="array-name" class="text-black" />
				</div>
				<div>
					<h3 class="underline">Existing Arrays</h3>
					<ul>
						<li v-for="(array, index) in arrays" :key="index">
							{{ array.name }} -
							<button @click="deleteArray(index)" class="font-bold text-red-600">X</button>
						</li>
					</ul>
				</div>
			</template>
		</WatchModal>
		<RouterView />
	</div>
</template>
<style scoped></style>