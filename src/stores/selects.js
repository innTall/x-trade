import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useSearchStore } from "./searches.js";
import { useArrayStore } from "./arrays.js";

export const useSelectStore = defineStore(
  "select",
  () => {
    const { searchTicker } = storeToRefs(useSearchStore());
    const { addTickerToArray, removeTickerFromArray } = useArrayStore();
    const { selectedArray } = storeToRefs(useArrayStore());
    const errorMessage = ref("");
    const MAX_TICKERS = 3;

    const selectTicker = (ticker) => {
      errorMessage.value = "";
      if (selectedArray.value.items.find(t => t.symbol === ticker.symbol)) {
        errorMessage.value = "This ticker is already selected.";
        return;
      }
      if (selectedArray.value.items.length >= MAX_TICKERS) {
        errorMessage.value = `You can only select up to ${MAX_TICKERS} tickers.`;
        return;
      }
      addTickerToArray(ticker);
      searchTicker.value = ""; // Always clear the search input
    };
    const deleteTicker = (ticker) => {
      removeTickerFromArray(ticker);
    };
    
    watch(searchTicker, () => {
      errorMessage.value = "";
    });
    return { errorMessage, MAX_TICKERS, selectTicker, deleteTicker };
  },
  { persist: true }
);
