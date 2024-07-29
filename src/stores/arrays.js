import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useArrayStore = defineStore(
  "array",
  () => {
    const router = useRouter();
    const arrays = ref([]);
    const newArrayName = ref("");
    const selectedArray = ref('');

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
      selectedArray.value = arrays.value.find(
        array => array.name === arrayName
      );
      router.push({ name: "WatchTemplate", params: { arrayName } });
    };

    const addTickerToArray = (ticker) => {
      if (selectedArray.value) {
        selectedArray.value.items.push(ticker);
      }
    };

    const removeTickerFromArray = (ticker) => {
      if (selectedArray.value) {
        selectedArray.value.items = selectedArray.value.items.filter(
          (t) => t.symbol !== ticker.symbol
        );
      }
    };
    return { arrays, newArrayName,
      createArray, deleteArray, selectArray,
      addTickerToArray, removeTickerFromArray, selectedArray,
    };
  },
  { persist: true }
);
