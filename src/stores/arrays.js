import { defineStore } from "pinia";
import { ref } from "vue";

export const useArrayStore = defineStore(
  "array",
  () => {
    const arrays = ref([]);
    const newArrayName = ref("");

    const createArray = () => {
      if (newArrayName.value) {
        arrays.value.push({ name: newArrayName.value, items: [] });
        newArrayName.value = "";
      }
    };

    const deleteArray = (index) => {
      arrays.value.splice(index, 1);
    };

    const selectArray = (index) => {
      alert(`Array ${arrays.value[index].name} selected`);
    };

    return {
      arrays,
      newArrayName,
      createArray,
      deleteArray,
      selectArray,
    };
  },
  { persist: false }
);
