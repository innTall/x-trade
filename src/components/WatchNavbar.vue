<script setup>
import WatchModal from '@/components/WatchModal.vue';
import { ref } from 'vue';
const arrays = ref([]);
const showModal = ref(false);
const newArrayName = ref('');

const openModal = () => {
	showModal.value = true;
};
const closeModal = () => {
	showModal.value = false;
};
const createArray = () => {
	if (newArrayName.value) {
		arrays.value.push({ name: newArrayName.value, items: [] });
		newArrayName.value = '';
		closeModal();
	}
};
const deleteArray = (index) => {
	arrays.value.splice(index, 1);
};
const selectArray = (index) => {
	alert(`Array ${arrays.value[index].name} selected`);
};
</script>

<template>
	<div class="fixed top-14 h-10 left-0 right-0 bg-gray-900 shadow z-10 border-b border-green-600">
		<nav class="container p-1 flex justify-between center text-sm">
			<div class="flex items-center ml-2">
				<ul>
					<li v-for="(array, index) in arrays" :key="index">
						<a href="#" @click="selectArray(index)">{{ array.name }}</a>
						<button @click="deleteArray(index)">Delete</button>
					</li>
				</ul>
			</div>
			<div class="flex justify-end mr-5 items-center">
				<button @click="openModal" class="p-1 rounded-md border border-green-600">Add</button>
			</div>
		</nav>
		<WatchModal v-if="showModal" @close="closeModal" @create="createArray">
			<template v-slot:body>
				<div>
					<label for="array-name">Enter new array name:</label>
					<input v-model="newArrayName" id="array-name" />
				</div>
			</template>
		</WatchModal>
	</div>
</template>

<style scoped></style>