import { defineStore } from "pinia";
import { ref } from "vue";
export const useSettingsStore = defineStore(
  "settings",
  () => {
    const minFirstOrder = ref();
    const gridOrders = ref();
    const firstBuyLevel = ref();
    const orderRiseCoef = ref();
    const buyLevelsCoef = ref();
    const priceRound = ref();
		const amountRound = ref();

    return {
      minFirstOrder,
      gridOrders,
      firstBuyLevel,
      orderRiseCoef,
      buyLevelsCoef,
      priceRound,
      amountRound,
    };
  },
  {
    persist: true,
  }
);