import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useSearchStore } from "./searches.js";
import { useArrayStore } from "./arrays.js";

export const useSelectStore = defineStore(
  "select",
  () => {
    const { searchTicker, searchTickers } = storeToRefs(useSearchStore());
    const { addTickerToArray, removeTickerFromArray } = useArrayStore();
    const selectedTickers = ref([]);
    const errorMessage = ref("");
    const MAX_TICKERS = 3;

    const selectTicker = (ticker) => {
      errorMessage.value = "";
      if (selectedTickers.value.find(t => t.symbol === ticker.symbol)) {
        errorMessage.value = "This ticker is already selected.";
        return;
      }
      if (selectedTickers.value.length >= MAX_TICKERS) {
        errorMessage.value = `You can only select up to ${MAX_TICKERS} tickers.`;
        return;
      }
      selectedTickers.value.push(ticker);
      addTickerToArray(ticker);
      searchTicker.value = ""; // Always clear the search input
    };
    const deleteTicker = (ticker) => {
      selectedTickers.value = selectedTickers.value.filter(
        t => t.symbol !== ticker.symbol
      );
      removeTickerFromArray(ticker);
    };
    
    watch(searchTicker, () => {
      errorMessage.value = "";
    });
    return { selectedTickers, errorMessage, MAX_TICKERS, selectTicker, deleteTicker };
  },
  { persist: true }
);
