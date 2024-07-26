import { defineStore } from "pinia";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useSearchStore } from "./searches.js";

export const useSelectStore = defineStore(
  "select",
  () => {
    const { searchTickers } = storeToRefs(useSearchStore());
    const selectedTickers = ref([]);
    const selectTicker = (tickerSymbol) => {
      const ticker = searchTickers.value.find(
        ticker => ticker.symbol === tickerSymbol
      );
      if (
        ticker &&
        !selectedTickers.value.find(t => t.symbol === tickerSymbol)
      ) {
        selectedTickers.value.push(ticker);
      }
    };
    const deselectTicker = (tickerSymbol) => {
      selectedTickers.value = selectedTickers.value.filter(
        ticker => ticker.symbol !== tickerSymbol
      );
    };
    return { selectedTickers, selectTicker,  };
  },
  { persist: false }
);
