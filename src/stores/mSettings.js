import { defineStore } from "pinia";
import { ref } from "vue";
export const useSettingsStore = defineStore(
  "settings",
  () => {
    const minFirstOrder = ref(null);
    const gridOrders = ref(null);
    const firstBuyLevel = ref(null);
    const orderRiseCoef = ref(null);
    const buyLevelsCoef = ref(null);
    const priceRound = ref(null);
		const amountRound = ref(null);

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
    persist: false,
  }
);