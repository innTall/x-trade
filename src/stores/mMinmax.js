import { defineStore } from "pinia";
import { ref, watch, onMounted } from "vue";
export const useMinmaxStore = defineStore(
  "minmax",
  () => {
    //const storeName = "minmax";
    const minPrice = ref(null);
    const maxPrice = ref(null);
    const gridSize = ref(null);
    const errorMessage = ref("");

    const getProfit = () => {
      if (minPrice.value < maxPrice.value) {
        gridSize.value = (
          ((Number(maxPrice.value / minPrice.value - 1) / 2 +
            (1 - minPrice.value / maxPrice.value) / 2) /
            2) *
          100
        ).toFixed(1);
        errorMessage.value = "";
      } else {
        errorMessage.value = "Price !";
      }
    };
    getProfit();
    return { minPrice, maxPrice, gridSize, errorMessage, getProfit };
  },
  { persist: true }
);

