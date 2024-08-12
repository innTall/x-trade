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
    const MAX_TICKERS = 20;

    const selectTicker = (ticker) => {
      errorMessage.value = "";
      if (selectedArray.value.items.find(t => t.symbol === ticker.symbol)) {
        errorMessage.value = "Reselected ticker!";
        return;
      }
      if (selectedArray.value.items.length >= MAX_TICKERS) {
        errorMessage.value = `See limit! - ${MAX_TICKERS} !!!`;
        return;
      }
      addTickerToArray(ticker);
      searchTicker.value = ""; // Always clear the search input
    };
    const deleteTicker = (ticker) => {
      removeTickerFromArray(ticker);
    };
    
    const isSelected = (ticker) => {
      return selectedArray.value.items.some((t) => t.symbol === ticker.symbol);
    };
    watch(searchTicker, () => {
      errorMessage.value = "";
    });
    return { errorMessage, MAX_TICKERS, selectTicker, deleteTicker, isSelected };
  },
  { persist: true }
);
