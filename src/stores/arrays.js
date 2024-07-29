import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useArrayStore = defineStore(
  "array",
  () => {
    const router = useRouter();
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

    const selectArray = (arrayName) => {
      router.push({ name: "WatchTemplate", params: { arrayName } });
    };

    return {
      arrays,
      newArrayName,
      createArray,
      deleteArray,
      selectArray,
    };
  },
  { persist: true }
);
