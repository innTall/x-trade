import { defineStore } from "pinia";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useSearchStore } from "./searches.js";

export const useSelectStore = defineStore(
  "select",
  () => {
    const { searchTickers } = storeToRefs(useSearchStore());
    const selectedTicker = ref(null);
    const selectTicker = (tickerSymbol) => {
      selectedTicker.value = searchTickers.value.find(
        ticker => ticker.symbol === tickerSymbol
      );
    };
    return { selectedTicker, selectTicker };
  },
  { persist: false }
);
