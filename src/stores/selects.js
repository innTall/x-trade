import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useSearchStore } from "./searches.js";

export const useSelectStore = defineStore(
  "select",
  () => {
    const { searchTicker, searchTickers } = storeToRefs(useSearchStore());
    const selectedTickers = ref([]);
    const errorMessage = ref("");
    const MAX_TICKERS = 3;

    const selectTicker = (tickerSymbol) => {
      const ticker = searchTickers.value.find(
        (ticker) => ticker.symbol === tickerSymbol
      );
      errorMessage.value = "";
      if (selectedTickers.value.includes(ticker)) {
        errorMessage.value = "This ticker is already selected.";
        return;
      }
      if (selectedTickers.value.length >= MAX_TICKERS) {
        errorMessage.value = `You can only select up to ${MAX_TICKERS} tickers.`;
        return;
      }
      selectedTickers.value.push(ticker);
      //searchTicker.value = ""; // Always clear the search input
    };
    const deselectTicker = (tickerSymbol) => {
      selectedTickers.value = selectedTickers.value.filter(
        (ticker) => ticker.symbol !== tickerSymbol
      );
    };
    
    watch(searchTicker, () => {
      errorMessage.value = "";
    });
    return { selectedTickers, errorMessage, MAX_TICKERS, selectTicker, deselectTicker };
  },
  { persist: false }
);
