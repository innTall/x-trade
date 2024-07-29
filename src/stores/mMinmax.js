import { defineStore } from "pinia";
import { ref, computed } from "vue";
export const useMinmaxStore = defineStore(
  "minmax",
  () => {
    const minPrice = ref();
    const maxPrice = ref();
    const gridSize = ref();
    const priceAlert = computed(() => {
      return minPrice.value >= maxPrice.value;
    });

    const getProfit = () => {
      if (!priceAlert.value) {
        gridSize.value = (
          ((Number(maxPrice.value / minPrice.value - 1) / 2 +
            (1 - minPrice.value / maxPrice.value) / 2) /
            2) *
          100
        ).toFixed(1);
      } else {
        gridSize.value = null;
      }
    };
    //getProfit();
    return { minPrice, maxPrice, gridSize, priceAlert, getProfit };
  },
  { persist: true }
);

